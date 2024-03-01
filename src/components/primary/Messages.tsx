import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import {v4 as uuidv4} from 'uuid';

export default function Messages(props: {url: string, setChatWindow: Function}) {

    const [chats, setChats] = useState([])
    const [findContactToChat, setFindContactToChat] = useState("");
    const [searchedContacts, setSearchedContacts] = useState([]);

    // useEffect(() => {
    //     try {
    //         async function getChats() {
    //             const url = props.url + "/get-chats";
    //             await fetch(url, {
    //                 credentials: "include",
    //             }).then((res) => res.json())
    //             .then((res) => {
    //                 setChats(res.chats);
    //             }).catch((err) => console.log(err));
    //         }
    //         getChats();
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }, [])

    useEffect(() => {
        try {
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
        } catch(err) {
            console.log(err);
        }
    }, [findContactToChat])
    
    function setChatWindowContext(email: string) {
        props.setChatWindow({
            show: true,
            email: email,
        })
    }

    const mappedSearchedContacts = searchedContacts.map((contact: any) => {
        return (
            <div key={uuidv4()} onClick={() => setChatWindowContext(contact.email)}>
                <p>{contact.name}</p>
            </div>
        )
    })

    return (
        <MessagesContainer>
            <h1>Chats</h1>
            <p>Start new chat</p>
            <input 
                type="text" 
                value={findContactToChat} 
                onChange={(e) => setFindContactToChat(e.target.value)} />
            <div>
                {mappedSearchedContacts}
            </div>
            <button>Start</button>

        </MessagesContainer>
    )
}

const MessagesContainer = styled(PrimaryContainer)`
    position: absolute;
    right: 10px;
    top: 64px;
`