import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { BlueButton, MainInput } from "../main-styles/Inputs";
import Person2Icon from '@mui/icons-material/Person2';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import ProfilePic from "./ProfilePic";

export default function NewPost(props: {url: String}) {

    const globalUser = useSelector((state: RootState) => state.user);

    const [sendPost, setSendPost] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        if (sendPost) {
            try {
                async function addPostToUser() {
                    const url = props.url + "/add-post";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            email: globalUser.email,
                            name: globalUser.name,
                            text: text,
                        })
                    }).then((res) => res.json())
                    .then(() => setSendPost(false))
                    .catch((err) => console.log(err));
                }
                addPostToUser();
            } catch(err) {
                console.log(err);
            }
        }
    }, [sendPost])

    return (
        <NewPostContainer>
            <ProfilePic width={"50px"} height={"50px"} hasEdit={false}/>
            <NewPostInput onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
            <ShareButton onClick={() => setSendPost(true)}>Share</ShareButton>
        </NewPostContainer>
    )
}

const NewPostContainer = styled(PrimaryContainer)`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    align-items: center;
`

const Img = styled.div`
    width: 50px;
    height: 50px;
    background-color: var(--secondary-color);
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NewPostInput = styled(MainInput)`
    width: 80%;
    border: 1px solid var(--border-color);
    border-radius: 30px;
    font-size: 1.3rem;
    padding-left: 10px;
    padding-right: 10px;
`

const ShareButton = styled(BlueButton)`
    height: 35px;
`