import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { SecondaryContainer } from '../main-styles/Containers';
import { useSelector} from "react-redux";
import { RootState} from '../../state/store';
import ProfilePic from './ProfilePic';
import {v4 as uuidv4} from 'uuid';

export default function Contacts(props: {url: String, setChatWindow: Function}) {

    const [contacts, setContacts] = useState([]);

    const globalUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (globalUser.email) {
            try {
                async function getContacts() {
                    const url = props.url + "/get-contacts";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: globalUser.email})
                    }).then((res) => res.json())
                    .then((res) => {
                        setContacts(res.contacts);
                    }).catch((err) => console.log(err));
                }
                getContacts();
            } catch(err) {
                console.log(err);
            }
        }
    }, [])

    function handleContactClick(email: string, name: string) {
        props.setChatWindow({
            show: true,
            name: name,
            email: email,
        })
    }

    const mappedContacts = contacts.map((contact: {email: string, name: string, profile_img_link: string}) => {
        return (
            <Contact key={uuidv4()} onClick={() => handleContactClick(contact.email, contact.name)}>
                <ProfilePic height={"50px"} width={"50px"} profile_img_link={contact.profile_img_link}/>
                <ContactName>{contact.name}</ContactName>
            </Contact>
        )
    })

    return (
        <ContactsContainer>
            <ContactsHeader>Contacts</ContactsHeader>
            {mappedContacts.length > 0 ? mappedContacts : <p>No contacts yet.</p>}
        </ContactsContainer>
    )
}

const ContactsContainer = styled(SecondaryContainer)`
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
    @media (max-width: 979px) { 
        display: none;
    }
`

const ContactsHeader = styled.p`
    font-size: 1.2rem;
    margin-bottom: 10px;
`

const Contact = styled.div`
    display: flex;
    align-items: center;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        background-color: var(--hover-background);
    }
`

const ContactName = styled.p`
    font-weight: bold;
    margin-left: 10px;
`