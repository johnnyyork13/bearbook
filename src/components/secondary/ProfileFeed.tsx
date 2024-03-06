import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { EditHeader } from "../main-styles/Text";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import Post from "./Post";
import { PostIDInterface } from "../../lib/interfaces";

export default function ProfileFeed(props: {url: String, email: String, firstName: String, setLoadProfile: Function}) {

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

    const mappedFeed = postList.map((post: PostIDInterface) => {
        return <Post 
            key={uuidv4()}
            url={props.url}
            post_id={post._id}
            setLoadProfile={props.setLoadProfile}
            // profile_img_link={globalUser}
        />
    })

    return (
        <ProfileFeedContainer>
            {mappedFeed.length > 0 ? mappedFeed : <ProfileFeedNoPosts>{props.firstName} hasn't posted anything yet.</ProfileFeedNoPosts>}
        </ProfileFeedContainer>
    )   
}

const ProfileFeedContainer = styled.div`
    width: 100%;

`

const ProfileFeedNoPosts = styled.p`
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
`