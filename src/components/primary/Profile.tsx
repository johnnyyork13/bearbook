import {useEffect, useState} from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import Person2Icon from '@mui/icons-material/Person2';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { BlueButton, GreyButton } from "../main-styles/Inputs";
import { PrimaryContainer } from "../main-styles/Containers";

import Bio from "../secondary/Bio";
import Friends from "../secondary/Friends";
import ProfileFeed from "../secondary/ProfileFeed";
import NewPost from "../secondary/NewPost";
import { UserState, setVisiting } from "../../state/user/userSlice";

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
    });

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
                        body: JSON.stringify({email: globalUser.visiting})
                    }).then((res) => res.json())
                    .then((res) => {
                        setProfileData(res.user);
                    }).catch((err) => console.log(err));
                }
                getUserProfile();
            } catch(err) {
                console.log(err);
            }
        } else {
            setProfileData(globalUser);
        }
    }, [globalUser.visiting]);

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileNameAndImageContainer>
                    <ProfileImage>
                        <Person2Icon />
                        <ProfileImageEditButton>
                            <CameraAltIcon />
                        </ProfileImageEditButton>
                    </ProfileImage>
                    <ProfileNameContainer>
                        <ProfileName>{profileData.name}</ProfileName>
                        <ProfileFriendsCount>{`${profileData.friends.length} friends`}</ProfileFriendsCount>
                    </ProfileNameContainer>
                </ProfileNameAndImageContainer>
                {!globalUser.visiting && <ProfileHeaderButtons>
                    <FindFriendsButton>Find Friends</FindFriendsButton>
                    {/* <EditProfileButton>Edit Profile</EditProfileButton> */}
                </ProfileHeaderButtons>}
            </ProfileHeader>
            <ProfileBody>
                <ProfileBodySidebar>
                    <Bio url={props.url}/>
                    <Friends />
                </ProfileBodySidebar>
                <ProfileMainFeedContainer>
                    {!globalUser.visiting && <NewPost url={props.url}/>}
                    <ProfileFeed url={props.url} email={profileData.email}/>
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

const ProfileImage = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    background-color: var(--secondary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 40%;
        height: 40%;
    }
`
const ProfileImageEditButton = styled.div`
    height: 35px;
    width: 35px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: var(--border-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 25px;
        height: 25px;
    }
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

const FindFriendsButton = styled(BlueButton)`
    margin-right: 10px;
`

const EditProfileButton = styled(GreyButton)`

`

const ProfileBody = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
`

const ProfileBodySidebar = styled.div`
    width: 30%;
    margin-left: 150px;
`

const ProfileMainFeedContainer = styled.div`
    margin-right: 150px;
    margin-left: 20px;
    width: 50%;
`