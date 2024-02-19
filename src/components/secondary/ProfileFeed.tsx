import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { BlueButton } from "../main-styles/Inputs";
import { EditHeader } from "../main-styles/Text";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import Post from "./Post";
import { PostInterface, UserPostInterface } from "../../lib/interfaces";

export default function ProfileFeed(props: {url: String, email: String}) {

    const globalUser = useSelector((state: RootState) => state.user);
    const [postList, setPostList] = useState([]);

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
                        setPostList(res.posts);
                    })
                    .catch((err) => console.log(err));
                }
                getUserFeed();  
            }
        } catch(err) {
            console.log(err);
        }
    }, [props.email])

    const mappedFeed = postList.map((post: UserPostInterface) => {
        console.log(post);
        return <Post 
            key={uuidv4()}
            url={props.url}
            post_id={post._id}
            // profile_img_link={globalUser}
        />
    })

    return (
        <ProfileFeedContainer>
            {mappedFeed}
        </ProfileFeedContainer>
    )   
}

const ProfileFeedContainer = styled.div`
    width: 100%;
`