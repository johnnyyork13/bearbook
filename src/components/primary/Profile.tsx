import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid';
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { EditButton, MainButton, MainInput, SecondaryButton } from "../main-styles/Inputs";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';
import Bio from "../secondary/Bio";
import FriendsFew from "../secondary/FriendsFew";
import ProfileFeed from "../secondary/ProfileFeed";
import NewPost from "../secondary/NewPost";
import { UserState, updateGlobalUser } from "../../state/user/userSlice";
import ProfilePic from "../secondary/ProfilePic";
import UploadImage from "../secondary/UploadImage";
import EditProfile from "../secondary/EditProfile";

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
    const [showEditProfilePicModal, setShowEditProfilePicModal] = useState(false);
    const [selectedProfileSection, setSelectedProfileSection] = useState("posts");
    const [allFriends, setAllFriends] = useState([]);
    const [findFriends, setFindFriends] = useState("");
    const [showEditProfile, setShowEditProfile] = useState(false);


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
    }, [globalUser.visiting, loadProfile, addFriend, globalUser.profile_img_link]);

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
    
    useEffect(() => {
        if (selectedProfileSection === "friends" && findFriends.length === 0) {
            try {
                async function getAllProfileFriends() {
                    const url = props.url + "/get-friends-all";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: profileData.email}),
                    }).then((res) => res.json())
                    .then((res) => {
                        setAllFriends(res.friends);
                    }).catch((err) => console.log(err));
                }
                getAllProfileFriends();
            } catch(err) {
                console.log(err);
            }
        }
    }, [selectedProfileSection, globalUser.visiting, profileData, findFriends])

    useEffect(() => {
        if (findFriends.length > 0) {
            try {
                async function getProfileFriends() {
                    const url = props.url + "/find-profile-friends";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: profileData.email, findFriends: findFriends}),
                    }).then((res) => res.json())
                    .then((res) => {
                        setAllFriends(res.friends);
                    }).catch((err) => console.log(err));
                }
                getProfileFriends();
            } catch(err) {
                console.log(err);
            }
        }
    }, [findFriends])   

    const mappedFriends = allFriends.map((friend: any) => {
        return <MappedFriendContainer key={uuidv4()} onClick={() => dispatch(updateGlobalUser({...globalUser, visiting: friend.email}))}>
                    <ProfilePic height={"70px"} width={"70px"} profile_img_link={friend.profile_img_link}/>
                    <MappedFriendName>{friend.name}</MappedFriendName>
                </MappedFriendContainer>
            })

    return (
        <ProfileContainer>
            {showEditProfilePicModal && 
                <UploadImage url={props.url} email={globalUser.email} preview={profileData.profile_img_link} setShowEditProfilePicModal={setShowEditProfilePicModal}/>
            }
            {showEditProfile && 
                <EditProfile url={props.url} profileData={profileData} setProfileData={setProfileData} setShowEditProfile={setShowEditProfile}/>  
            }
            <ProfileHeader>
                <ProfileNameAndImageContainer>
                    <ProfilePicContainer>
                        <ProfilePic height={"150px"} width={"150px"} profile_img_link={profileData.profile_img_link}/>
                        <ProfilePicEditButton onClick={() => setShowEditProfilePicModal(true)}><CameraAltIcon /></ProfilePicEditButton>
                    </ProfilePicContainer>
                    <ProfileNameContainer>
                        <ProfileName>{profileData.name}</ProfileName>
                        <ProfileFriendsCount>{`${profileData.friends.length} friend${profileData.friends.length === 1 ? "" : "s"}`}</ProfileFriendsCount>
                    </ProfileNameContainer>
                </ProfileNameAndImageContainer>
                <ProfileHeaderButtons>
                    {profileData.email === globalUser.email && <>
                        <FindFriendsButton>Find Friends</FindFriendsButton>
                        <EditProfileButton onClick={() => setShowEditProfile(true)}>Edit Profile</EditProfileButton>
                    </>}
                    {profileData.email !== globalUser.email && <>
                        {!isFriend && <AddFriendButton onClick={() => setAddFriend(true)}>Add Friend</AddFriendButton>}
                        {isFriend && <RemoveFriendButton>Remove Friend</RemoveFriendButton>}
                    </>}
                </ProfileHeaderButtons>
            </ProfileHeader>
            <ProfileTrackSection>
                    <ProfileTrackOptionContainer>
                        <ProfileTrackOption onClick={() => setSelectedProfileSection('posts')} $selected={selectedProfileSection === "posts" ? true : false}>
                            <ProfileTrackOptionText>Posts</ProfileTrackOptionText>
                        </ProfileTrackOption>
                        <ProfileTrackOption onClick={() => setSelectedProfileSection('friends')} $selected={selectedProfileSection === "friends" ? true : false}>
                            <ProfileTrackOptionText>Friends</ProfileTrackOptionText>
                        </ProfileTrackOption>
                    </ProfileTrackOptionContainer>
            </ProfileTrackSection>
            {selectedProfileSection === 'posts' && <ProfilePosts>
                <ProfilePostsSidebar>
                    <Bio url={props.url} profileData={profileData}/>
                    <FriendsFew url={props.url}/>
                </ProfilePostsSidebar>
                <ProfileMainFeedContainer>
                    {!globalUser.visiting && <NewPost profile_img_link={profileData.profile_img_link} url={props.url} setLoadProfile={setLoadProfile} />}
                    {loadProfile && <ProfileFeed url={props.url} email={profileData.email} setLoadProfile={setLoadProfile} />}
                </ProfileMainFeedContainer>
            </ProfilePosts>}
            {selectedProfileSection === "friends" && 
                <ProfileFriendsContainer>
                    <ProfileFriendsHeaderContainer>
                        <ProfileFriendsHeader>Friends</ProfileFriendsHeader>
                        <ProfileFriendsSearchContainer>
                            <SearchIcon />
                            <ProfileFriendsSearchInput value={findFriends} onChange={(e) => setFindFriends(e.target.value)} placeholder="Search for friends"/>
                        </ProfileFriendsSearchContainer>
                    </ProfileFriendsHeaderContainer>
                    <ProfileFriends>
                        {mappedFriends}
                    </ProfileFriends>
                </ProfileFriendsContainer>}
        </ProfileContainer>
    )
}


const ProfileContainer = styled.main`
    display: flex;
    flex-direction: column;
`

const ProfilePicContainer = styled.div`
    position: relative;
`

const ProfilePicEditButton = styled.div`
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
    cursor: pointer;
    svg {
        width: 25px;
        height: 25px;
    }
`

const ProfileHeader = styled(PrimaryContainer)`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 200px;
    padding-right: 200px;
    border-radius: 0px;
    box-shadow: 0px 0px 0px 0px;
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

const ProfileTrackSection = styled(PrimaryContainer)`
    border-radius: 0px;
    padding: 0px;
    padding-top: 20px;
    padding-left: 200px;
    padding-right: 200px;

`

const ProfileTrackOptionContainer = styled.div`
    box-shadow: 0px -2px 0px 0px rgba(220,220,220,.5);
    display: flex;
    align-items: flex-end;
    height: 100%;
`

const ProfileTrackOption = styled.div<{$selected: boolean}>`
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    cursor: pointer;
    font-weight: bold;
    ${props => props.$selected ? 
        `border-bottom: 5px solid var(--primary-orange);
        color: var(--primary-orange);` :
        `border-bottom: 5px solid transparent;`}
`

const ProfileTrackOptionText = styled.p`
    display: flex;
    align-items: center;
`

const ProfilePosts = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
`

const ProfilePostsSidebar = styled.div`
    width: 30%;
    margin-left: 150px;
    margin-right: 20px;
`

const ProfileMainFeedContainer = styled.div`
    margin-right: 150px;
    margin-left: 20px;
    width: 50%;
`

const MappedFriendContainer = styled.div`

`

const MappedFriendName = styled.p`

`

const ProfileFriendsContainer = styled(PrimaryContainer)`
    margin-left: 200px;
    margin-right: 200px;
    margin-top: 20px;
`

const ProfileFriends = styled.div`

`

const ProfileFriendsHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const ProfileFriendsHeader = styled.p`
    font-size: 1.4rem;
    font-weight: bolder;
`

const ProfileFriendsSearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    svg {
        position: absolute;
        left: 10px;
        color: var(--border-color);
    }
`

const ProfileFriendsSearchInput = styled(MainInput)`
    font-size: 1.2rem;
    height: 25px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    padding-left: 30px;
    padding-right: 10px;
    margin-left: 5px;
    
`