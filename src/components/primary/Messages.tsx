import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import {v4 as uuidv4} from 'uuid';
import ProfilePic from "../secondary/ProfilePic";
import { ExitButton } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import Profile from "./Profile";

export default function Messages(props: {url: string, setChatWindow: Function, setShowMessages: Function}) {

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
            <SearchedContact key={uuidv4()} onClick={() => setChatWindowContext({email: contact.email, name: contact.name})}>
                <ProfilePic height="35px" width="35px" profile_img_link={contact.profile_img_link} />
                <SearchedContactName>{contact.name}</SearchedContactName>
            </SearchedContact>
        )
    })


    const mappedPreviousChats = chats.map((chat: any) => {
        return <PreviousChat key={uuidv4()} onClick={() => setChatWindowContext({email: chat.email, name: chat.name})}>
            <ProfilePic height="35px" width="35px" profile_img_link={chat.profile_img_link} />
            <PreviousChatName>{chat.name}</PreviousChatName>
        </PreviousChat>
    })

    return (
        <MessagesContainer>
            <MessagesHeader>Chats <ExitButton onClick={() => props.setShowMessages(false)}><CloseIcon /></ExitButton></MessagesHeader>
            <MessagesSearchContainer>
                <MessagesSearchInput 
                    type="text" 
                    value={findContactToChat} 
                    onChange={(e) => setFindContactToChat(e.target.value)} 
                    placeholder="Start new chat"
                    />
                {findContactToChat.length > 0 && <MessagesSearchResults>
                    <MessagesSearchResultsHeader>Search Results</MessagesSearchResultsHeader>
                    {mappedSearchedContacts.length > 0 ? mappedSearchedContacts : <p>No results...</p>}
                </MessagesSearchResults>}
            </MessagesSearchContainer>
            <PreviousMessagesContainer>
                <MessagesSearchResultsHeader>Previous Chats</MessagesSearchResultsHeader>
                {mappedPreviousChats}
            </PreviousMessagesContainer>
        </MessagesContainer>
    )
}

const MessagesContainer = styled(PrimaryContainer)`
    width: 300px;
    position: absolute;
    right: 10px;
    top: 60px;
`

const MessagesHeader = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const MessagesSearchResults = styled(PrimaryContainer)`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 300px;
    top: 95px;
    z-index: 2;
    padding: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`

const MessagesSearchResultsHeader = styled.p`
    font-weight: bold;
    margin-bottom: 10px;
`

const SearchedContact = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: var(--hover-background);
    }
`

const SearchedContactName = styled.p`
    font-weight: bold;
    margin-left: 15px;
`

const PreviousMessagesContainer = styled.div`
    margin-top: 10px;
`

const PreviousChat = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        background-color: var(--hover-background);
    }
`

const PreviousChatName = styled.p`
    font-weight: bold;
    margin-left: 15px;
`