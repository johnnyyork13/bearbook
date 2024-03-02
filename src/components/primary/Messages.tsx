import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import {v4 as uuidv4} from 'uuid';
import ProfilePic from "../secondary/ProfilePic";

export default function Messages(props: {url: string, setChatWindow: Function}) {

    const globalUser = useSelector((state: RootState) => state.user);

    const [chats, setChats] = useState([])
    const [findContactToChat, setFindContactToChat] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);

    useEffect(() => {
        try {
            async function getChats() {
                const url = props.url + "/get-previous-chats";
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
                    setChats(res.chats);
                }).catch((err) => console.log(err));
            }
            getChats();
        } catch(err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        try {
            if (findContactToChat.length > 0) {
                async function getContactsForNewChat() {
                    const url = props.url + "/get-searched-message-contacts";
                    await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({name: findContactToChat})
                    }).then((res) => res.json())
                    .then((res) => {
                        setSearchedContacts(res.friends);
                    }).catch((err) => console.log(err));
                }
                getContactsForNewChat();
            }
        } catch(err) {
            console.log(err);
        }
    }, [findContactToChat])
    
    function setChatWindowContext(info: {email: String, name: String}) {
        props.setChatWindow({
            show: true,
            email: info.email,
            name: info.name,
        })
    }

    const mappedSearchedContacts = searchedContacts.map((contact: any) => {
        return (
            <div key={uuidv4()} onClick={() => setChatWindowContext({email: contact.email, name: contact.name})}>
                <p>{contact.name}</p>
            </div>
        )
    })


    const mappedPreviousChats = chats.map((chat: any) => {
        return <PreviousChat onClick={() => setChatWindowContext({email: chat.email, name: chat.name})}>
            <ProfilePic height="35px" width="35px" hasEdit={false} profile_img_link="" />
            <PreviousChatName>{chat.name}</PreviousChatName>
        </PreviousChat>
    })

    return (
        <MessagesContainer>
            <MessagesHeader>Chats</MessagesHeader>
            <MessagesSearchContainer>
                <MessagesSearchInput 
                    type="text" 
                    value={findContactToChat} 
                    onChange={(e) => setFindContactToChat(e.target.value)} 
                    placeholder="Search for contacts"
                    />
                <MessagesSearchResults>
                    {mappedSearchedContacts}
                </MessagesSearchResults>
            </MessagesSearchContainer>
            <PreviousMessagesContainer>
                {mappedPreviousChats}
            </PreviousMessagesContainer>
        </MessagesContainer>
    )
}

const MessagesContainer = styled(PrimaryContainer)`
    width: 300px;
    position: absolute;
    right: 10px;
    top: 64px;
`

const MessagesHeader = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 15px;
`

const MessagesSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MessagesSearchInput = styled.input`
    border-radius: 10px;
    border: 1px solid var(--border-color);
    height: 25px;
    padding-left: 10px;
    padding-right: 10px;
    width: 270px;
`

const MessagesSearchResults = styled.div`
    width: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
`

const PreviousMessagesContainer = styled.div`
    
`

const PreviousChat = styled.div`
    display: flex;
    align-items: center;
`

const PreviousChatName = styled.p`
    font-weight: bold;
    margin-left: 15px;
`