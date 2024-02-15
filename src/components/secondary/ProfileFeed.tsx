import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { BlueButton } from "../main-styles/Inputs";
import { EditHeader } from "../main-styles/Text";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

export default function ProfileFeed(props: {url: String, email: String}) {

    const [feed, setFeed] = useState([]);

    useEffect(() => {
        try {
            if (props.email) {
                async function getUserFeed() {
                    const url = props.url + "/get-profile-feed";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: props.email})
                    }).then((res) => res.json())
                    .then((res) => {
                        setFeed(res.user.posts);
                    })
                    .catch((err) => console.log(err));
                }
                getUserFeed();  
            }
        } catch(err) {
            console.log(err);
        }
    }, [props.email])

    interface PostInterface {
        date: string,
        email: string,
        name: string,
        text: string,
        time: string,
    }

    const mappedFeed = feed.map((post: PostInterface) => {
        return <p key={uuidv4()}>{post.text}</p>
    })

    return (
        <ProfileFeedContainer>
            {mappedFeed}
        </ProfileFeedContainer>
    )   
}

const ProfileFeedContainer = styled(PrimaryContainer)`
    width: 100%;
`