import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import ProfilePic from "./ProfilePic";
import {v4 as uuidv4} from 'uuid';


export default function Friends(props: {url: String}) {

    const [friends, setFriends] = useState([]);
    const globalUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        try {
            if (globalUser.email) {
                async function getFriends() {
                    const url = props.url + "/get-friends";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: globalUser.email})
                    }).then((res) => res.json())
                    .then((res) => {
                        setFriends(res.friends);
                    }).catch((err) => console.log(err));
                }
                getFriends();
            }
        } catch(err) {
            console.log(err);
        }
    }, [])

    interface Friend {
        name: string,
        email: string,
    }

    const mappedFriends = friends.map((friend: Friend) => {
        return (
            <FriendTile key={uuidv4()}>
                <ProfilePic 
                    key={uuidv4()} 
                    height="70px" 
                    width="70px" 
                    hasEdit={false} 
                    profile_img_link=""
                />
                <FriendName>{friend.name}</FriendName>
            </FriendTile>

        )
    })

    return (
        <FriendsContainer>
            <FriendsHeader>Friends</FriendsHeader>
            <FriendsGrid>
                {mappedFriends}
            </FriendsGrid>
        </FriendsContainer>
    )
}

const FriendsContainer = styled(PrimaryContainer)`
    grid-row: 2;
    min-height: 300px;
`

const FriendsHeader = styled.p`
    font-size: 1.4rem;
    font-weight: bolder;
    margin-bottom: 20px;
`


const FriendsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
`

const FriendTile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FriendName = styled.p`

`