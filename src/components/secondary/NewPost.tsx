import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { MainButton, MainInput } from "../main-styles/Inputs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState} from '../../state/store';
import ProfilePic from "./ProfilePic";

export default function NewPost(props: {url: String, profile_img_link: string, setLoadParent: Function}) {

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
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            email: globalUser.email,
                            name: globalUser.name,
                            role: globalUser.role,
                            text: text,
                        })
                    }).then((res) => res.json())
                    .then(() => {
                        setSendPost(false)
                        setText("");
                        props.setLoadParent(true);
                    })
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
            <ProfilePic width={"50px"} height={"50px"} profile_img_link={props.profile_img_link}/>
            <NewPostInput value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
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

const NewPostInput = styled(MainInput)`
    width: calc(100% - 150px);
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid var(--border-color);
    border-radius: 30px;
    font-size: 1.3rem;
    padding-left: 15px;
    padding-right: 10px;
`

const ShareButton = styled(MainButton)`
    height: 35px;
`