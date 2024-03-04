import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { ExitButton } from "../main-styles/Inputs";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatWindow(props: {url: string, email: string, contactName: string, setChatWindow: Function}) {

    const messagesEndRef = useRef(null);
    const globalUser = useSelector((state: RootState) => state.user);

    const [chat, setChat] = useState({
        _id: "",
        messages: [],
    })
    const [message, setMessage] = useState("");
    const [sendMessage, setSendMessage] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    const SOCKET_URL = "http://localhost:3001";
    const socket = io(SOCKET_URL);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    }

    useEffect(() => {
        if (!requestSent) {
            socket.emit("get-chat-history", {
                userEmail: globalUser.email,
                contactEmail: props.email,
            })
            socket.on("receive-chat-history", (res) => {
                setChat(res);
            })
            setRequestSent(true);
        }
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [chat])

    useEffect(() => {
        if (sendMessage) {
            socket.emit('send-message', {
                name: globalUser.name,
                chat_id: chat._id,
                email: globalUser.email,
                message: message
            });
            socket.on("receive-message", (res) => {
                setChat(res);
            })
            setSendMessage(false);
            setMessage("");
        }
    }, [sendMessage]);

    const mappedMessages = chat && chat.messages.map((message: any) => {
        return message.email === globalUser.email ?
        <MessageContainerRight key={uuidv4()}>
            <MessageBubbleName>{message.name}</MessageBubbleName>
            <MessageBubble>
                <MessageBubbleBody>{message.message}</MessageBubbleBody>
            </MessageBubble>
        </MessageContainerRight> : 
        <MessageContainer key={uuidv4()}>
            <MessageBubbleName>{message.name}</MessageBubbleName>
            <MessageBubble>
                <MessageBubbleBody>{message.message}</MessageBubbleBody>
            </MessageBubble>
        </MessageContainer> 
    })

    return (
        <>
            {chat && <ChatWindowContainer>
                <ChatWindowHeader>
                    <ChatWindowHeaderTitle>
                        {props.contactName}
                        <ExitButton onClick={() => props.setChatWindow({show: false, email: ""})}><CloseIcon /></ExitButton>
                    </ChatWindowHeaderTitle>
                </ChatWindowHeader>
                <ChatWindowBody>
                    <ChatWindowBodyContent>
                        <ChatWindowBodyContentMessage>
                            {mappedMessages}
                            <div ref={messagesEndRef}></div>
                        </ChatWindowBodyContentMessage>
                    </ChatWindowBodyContent>
                </ChatWindowBody>
                <ChatWindowFooter>
                    <ChatWindowFooterInput
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text" 
                        placeholder="Type a message" 
                    />
                    <ChatWindowFooterButton onClick={() => setSendMessage(true)}>
                        <SendIcon />
                    </ChatWindowFooterButton>
                </ChatWindowFooter>
            </ChatWindowContainer>}
        </>
    )
}

const ChatWindowContainer = styled(PrimaryContainer)`
    position: fixed;
    bottom: 0;
    right: 20px;
    display: flex;
    flex-direction: column;
    padding: 0px;
    width: 250px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
`
const ChatWindowHeader = styled.div`
    border-bottom: 2px solid var(--border-color);
    padding: 10px;
`

const ChatWindowHeaderTitle = styled.h1`
    font-size: 1.2rem;
    font-weight: bolder;
    display: flex;
    justify-content: space-between;
`

const ChatWindowBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

const ChatWindowBodyContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 300px;
    max-height: 300px;
    overflow-y: auto;
    padding-bottom: 10px;
`

const ChatWindowBodyContentMessage = styled.div`

`

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`

const MessageContainerRight = styled(MessageContainer)`
    text-align: right;
    div {
        background-color: var(--primary-orange);
        color: white;
        align-self: flex-end;
    }
`

const MessageBubble = styled.div`
    border-radius: 15px;
    background-color: var(--primary-grey);
    padding: 10px;
    width: fit-content;
`

const MessageBubbleName = styled.p`
    margin: 10px;
    margin-bottom: 4px;
    margin-top: 0px;
    font-size: 0.8rem;
`

const MessageBubbleBody = styled.p`

`


const ChatWindowFooter = styled.div`
    display: flex;
    padding: 5px;
    align-items: center;
    justify-content: space-between;
`

const ChatWindowFooterInput = styled.input`
    border-radius: 5px;
    border: 1px solid var(--border-color);
    height: 25px;
    width: 100%;
    margin-right: 10px;
    padding-left: 5px;
`

const ChatWindowFooterButton = styled.div`
    color: var(--primary-orange);
    
`
