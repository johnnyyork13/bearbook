import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function ChatWindow(props: {url: string, email: string}) {

    const globalUser = useSelector((state: RootState) => state.user);

    const [context, setContext] = useState({
        _id: "",
        name: "",
        email: "",
        messages: [],
    })
    const [message, setMessage] = useState("");
    const [sendMessage, setSendMessage] = useState(false);

    const SOCKET_URL = "http://localhost:3001";
    const socket = io(SOCKET_URL);

    useEffect(() => {
        socket.emit('get-context', {globalEmail: globalUser.email, contactEmail: props.email});
        socket.on('context', (context) => {
            console.log('getting context');
            setContext(context);
        })
    }, [])

    useEffect(() => {
        if (sendMessage) {
            console.log('sending message', context._id);
            socket.emit('send-message', {
                name: globalUser.name,
                chat_id: context._id,
                globalEmail: globalUser.email, 
                contactEmail: props.email, 
                message: message
            });
            setSendMessage(false);
        }
    }, [sendMessage]);


    console.log(context);

    return (
        <ChatWindowContainer>
            <ChatWindowHeader>
                <ChatWindowHeaderTitle>Chat</ChatWindowHeaderTitle>
            </ChatWindowHeader>
            <ChatWindowBody>
                <ChatWindowBodyContent>
                    <ChatWindowBodyContentMessage>
                        <p>Message</p>
                    </ChatWindowBodyContentMessage>
                </ChatWindowBodyContent>
            </ChatWindowBody>
            <ChatWindowFooter>
                <ChatWindowFooterInput>
                    <input 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text" 
                        placeholder="Type a message" 
                    />
                </ChatWindowFooterInput>
                <ChatWindowFooterButton>
                    <button onClick={() => setSendMessage(true)}>Send</button>
                </ChatWindowFooterButton>
            </ChatWindowFooter>
        </ChatWindowContainer>
    )
}

const ChatWindowContainer = styled(PrimaryContainer)`
    position: fixed;
    bottom: 0;
    right: 20px;
    display: flex;
    flex-direction: column;
`
const ChatWindowHeader = styled.div`

`

const ChatWindowHeaderTitle = styled.h1`

`

const ChatWindowBody = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const ChatWindowBodyContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const ChatWindowBodyContentMessage = styled.div`

`

const ChatWindowFooter = styled.div`

`

const ChatWindowFooterInput = styled.div`

`

const ChatWindowFooterButton = styled.div`

`
