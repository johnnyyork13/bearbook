import {useEffect, useState} from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { EditButton, MainButton, SecondaryButton } from "../main-styles/Inputs";
import { PrimaryContainer } from "../main-styles/Containers";

import Bio from "../secondary/Bio";
import Friends from "../secondary/Friends";
import ProfileFeed from "../secondary/ProfileFeed";
import NewPost from "../secondary/NewPost";
import { UserState, updateGlobalUser } from "../../state/user/userSlice";
import ProfilePic from "../secondary/ProfilePic";

export default function Profile(props: {url: String}) {

    const navigate = useNavigate();
    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [profileData, setProfileData] = useState<UserState>({
        email: "",
        firstName: "",
        lastName: "",
        name: "",
        friends: [],
        loggedIn: false,
        visiting: "",
        profile_img_link: "",
    });
    const [loadProfile, setLoadProfile] = useState(false);
    const [addFriend, setAddFriend] = useState(false);
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        if (!globalUser.loggedIn) {
            navigate("/login");
        }
        if (globalUser.visiting) {
            try {
                const url = props.url + "/get-profile";
                async function getUserProfile() {
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            email: globalUser.email,
                            visiting: globalUser.visiting
                        })
                    }).then((res) => res.json())
                    .then((res) => {
                        setProfileData(res.user);
                        if (res.isFriend) {
                            setIsFriend(true);
                        }
                        setLoadProfile(true);
                    }).catch((err) => console.log(err));
                }
                getUserProfile();
            } catch(err) {
                console.log(err);
            }
        } else {
            setProfileData(globalUser);
            setLoadProfile(true);
        }
    }, [globalUser.visiting, loadProfile, addFriend]);

    useEffect(() => {
        if (addFriend) {
            try {
                const url = props.url + "/add-friend";
                async function addFriendToUser() {
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            email: globalUser.email,
                            name: profileData.name,
                            friend: profileData.email,
                        })
                    }).then((res) => res.json())
                    .then(() => {
                        setAddFriend(false);
                        dispatch(updateGlobalUser({
                            ...globalUser,
                            friends: [...globalUser.friends, profileData.email],
                        }))
                    })
                    .catch((err) => console.log(err));
                }
                addFriendToUser();
            } catch(err) {
                console.log(err);
            }
        }
    }, [addFriend])

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileNameAndImageContainer>
                    <ProfilePic height={"150px"} width={"150px"} hasEdit={true} profile_img_link=""/>
                    <ProfileNameContainer>
                        <ProfileName>{profileData.name}</ProfileName>
                        <ProfileFriendsCount>{`${profileData.friends.length} friend${profileData.friends.length > 1 ? "s" : ""}`}</ProfileFriendsCount>
                    </ProfileNameContainer>
                </ProfileNameAndImageContainer>
                <ProfileHeaderButtons>
                    {profileData.email === globalUser.email && <>
                        <FindFriendsButton>Find Friends</FindFriendsButton>
                        <EditProfileButton>Edit Profile</EditProfileButton>
                    </>}
                    {profileData.email !== globalUser.email && <>
                        {!isFriend && <AddFriendButton onClick={() => setAddFriend(true)}>Add Friend</AddFriendButton>}
                        {isFriend && <RemoveFriendButton>Remove Friend</RemoveFriendButton>}
                    </>}
                </ProfileHeaderButtons>
            </ProfileHeader>
            <ProfileBody>
                <ProfileBodySidebar>
                    <Bio url={props.url}/>
                    <Friends url={props.url}/>
                </ProfileBodySidebar>
                <ProfileMainFeedContainer>
                    {!globalUser.visiting && <NewPost url={props.url} setLoadProfile={setLoadProfile} />}
                    {loadProfile && <ProfileFeed url={props.url} email={profileData.email} setLoadProfile={setLoadProfile} />}
                </ProfileMainFeedContainer>
            </ProfileBody>
        </ProfileContainer>
    )
}


const ProfileContainer = styled.main`

`

const ProfileHeader = styled(PrimaryContainer)`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 200px;
    padding-right: 200px;
    border-radius: 0px;
`
const ProfileNameAndImageContainer = styled.div`
    display: flex;
    align-items: flex-end;
`


const ProfileNameContainer = styled.div`
    margin-left: 20px;
`

const ProfileName = styled.p`
    font-weight: bolder;
    font-size: 2rem;
`

const ProfileFriendsCount = styled.p`
    margin-top: 5px;
`

const ProfileHeaderButtons = styled.div`
    display: flex;

`

const FindFriendsButton = styled(MainButton)`
    margin-right: 10px;
`

const EditProfileButton = styled(EditButton)`

`

const AddFriendButton = styled(MainButton)`

`

const RemoveFriendButton = styled(SecondaryButton)`

`

const ProfileBody = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
`

const ProfileBodySidebar = styled.div`
    width: 30%;
    margin-left: 150px;
    margin-right: 20px;
`

const ProfileMainFeedContainer = styled.div`
    margin-right: 150px;
    margin-left: 20px;
    width: 50%;
`