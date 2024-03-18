import styled from "styled-components";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setGlobalUser } from '../../state/user/userSlice';
import {v4 as uuidv4} from 'uuid';
import ProfilePic from "../secondary/ProfilePic";
import { useNavigate } from "react-router-dom";
import { MainButton, MainInput, SecondaryButton } from "../main-styles/Inputs";
import { PrimaryContainer } from "../main-styles/Containers";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

export default function Friends(props: {url: String, friendsDefaultSection: String}) {

    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [friendRequests, setFriendRequests] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [respondToFriendRequest, setRespondToFriendRequest] = useState({
        send: false,
        accept: false,
        friendEmail: "",
        friendName: "",
    });
    const [displaySection, setDisplaySection] = useState(props.friendsDefaultSection ? props.friendsDefaultSection : "all");
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [addFriend, setAddFriend] = useState({
        send: false,
        email: globalUser.email,
        friend: "",
        name: "",
    });

    useEffect(() => {
        try {
            async function getAllFriends() {
                const url = props.url + "/get-friends-all";
                await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email: globalUser.email})
                }).then((res) => res.json())
                    .then((res) => {
                        setAllFriends(res.friends)
                        setFriendRequests(res.friendRequests)
                    })
                    .catch((err) => console.log(err));
                }
            getAllFriends();
        } catch(err) {
            console.log(err);
        }
    }, [globalUser, addFriend])

    useEffect(() => {
        if (respondToFriendRequest.send) {
            try {
                async function handleFriendRequest() {
                    const url = props.url + '/handle-friend-request';
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: globalUser.email, 
                            friendName: respondToFriendRequest.friendName, 
                            friendEmail: respondToFriendRequest.friendEmail, 
                            accept: respondToFriendRequest.accept})
                    }).then((res) => res.json())
                    .then((res) => {
                        dispatch(setGlobalUser(res.user));
                        setRespondToFriendRequest({send: false, accept: false, friendEmail: "", friendName: ""});
                    })
                }
                handleFriendRequest();
            } catch(err) {  
                console.log(err);
            }
        }
    }, [respondToFriendRequest.send])

    useEffect(() => {
        if (searchTerm.length > 0) {
            try {
                async function searchForFriends() {
                    const url = props.url + "/search";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({name: searchTerm, email: globalUser.email})
                    }).then((res) => res.json())
                    .then((res) => {
                        setSearchResults(res.results);
                    })
                }
                searchForFriends();
            } catch(err) {
                console.log(err);
            }
        }
    }, [searchTerm, addFriend, respondToFriendRequest])

    useEffect(() => {
        if (addFriend.send) {
            try {
                async function sendFriendRequest() {
                    const url = props.url + "/add-friend";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({email: globalUser.email, friend: addFriend.friend, name: addFriend.name})
                    }).then((res) => res.json())
                    .then(() => {
                        setAddFriend({send: false, email: globalUser.email, friend: "", name: ""});
                    })
                }
                sendFriendRequest();
            } catch(err) {
                console.log(err);
            }
        }
    }, [addFriend.send])

    function handleRequestClick(profileEmail: string) {
        dispatch(setGlobalUser({...globalUser, visiting: profileEmail}));
        navigate('/profile');
    }

    const mappedAllFriends = allFriends.map((friend: any) => {
        return <Friend key={uuidv4()} onClick={() => {
                dispatch(setGlobalUser({...globalUser, visiting: friend.email}));
                navigate('/profile');
                }
            }>
            <ProfilePic width={"70px"} height={"70px"} profile_img_link={friend.profile_img_link} />
            <FriendName onClick={() => handleRequestClick(friend.email)}>{friend.name}</FriendName>
            <MainButton onClick={() => {dispatch(setGlobalUser({...globalUser, visiting: friend.email})); navigate('/profile')}}>Go to Profile</MainButton>
        </Friend>
    })

    const mappedSentFriendRequests = friendRequests.filter((request: any) => request.status === "sent" && request)
        .map((request: any) => {
        return <Friend key={uuidv4()}>
            <ProfilePic width={"70px"} height={"70px"} profile_img_link={request.profile_img_link} />
            <FriendName onClick={() => handleRequestClick(request.email)}>{request.name}</FriendName>
            <AlreadyFriendsText>Pending</AlreadyFriendsText>
            <SecondaryButton onClick={() => setRespondToFriendRequest({accept: false, send: true, friendEmail: request.email, friendName: request.name})}>Delete</SecondaryButton>
        </Friend>
    })

    const mappedReceivedFriendRequests = friendRequests.filter((request: any) => request.status === "received" && request)
        .map((request: any) => {
        return <Friend key={uuidv4()}>
            <ProfilePic width={"70px"} height={"70px"} profile_img_link={request.profile_img_link} />
            <FriendName onClick={() => handleRequestClick(request.email)}>{request.name}</FriendName>
            <MainButton onClick={() => setRespondToFriendRequest({accept: true, send: true, friendEmail: request.email, friendName: request.name})}>Confirm</MainButton>
            <SecondaryButton onClick={() => setRespondToFriendRequest({accept: false, send: true, friendEmail: request.email, friendName: request.name})}>Delete</SecondaryButton>
        </Friend>
    })

    const mappedSearchResults = searchResults.map((result: any) => {
        return <Friend key={uuidv4()}>
            <ProfilePic width={"70px"} height={"70px"} profile_img_link={result.profile_img_link} />
            <FriendName onClick={() => handleRequestClick(result.email)}>{result.name}</FriendName>
            {result.email !== globalUser.email &&
                <>
                    {result.status === "friends" ? <AlreadyFriendsText>Friends <CheckIcon /></AlreadyFriendsText> :
                        result.status === "sent" ? <AlreadyFriendsText>Request Sent</AlreadyFriendsText> :
                        result.status === "received" ? <MainButton onClick={() => setRespondToFriendRequest({accept: true, send: true, friendEmail: result.email, friendName: result.name})}>Confirm Request</MainButton> :
                        <MainButton onClick={() => setAddFriend((prev) => ({...prev, friend: result.email, name: result.name, send: true}))}>Add Friend</MainButton>
                    }
                </>
            }            
            <SecondaryButton onClick={() => {dispatch(setGlobalUser({...globalUser, visiting: result.email})); navigate('/profile')}}>Go to Profile</SecondaryButton>
        </Friend>
    })

    return (
        <FriendsContainer>
            <Sidebar>
                <SidebarHeader>Friends</SidebarHeader>
                <SidebarOption onClick={() => setDisplaySection("all")} $selected={displaySection === "all" ? true : false}>
                    <SidebarIconContainer>
                        <GroupAddIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Show All</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setDisplaySection("requests")} $selected={displaySection === "requests" ? true : false}>
                    <SidebarIconContainer>
                        <PersonAddIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Friend Requests</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setDisplaySection("friends")} $selected={displaySection === "friends" ? true : false}>
                    <SidebarIconContainer>
                        <PeopleAltIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Friends</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setDisplaySection("search")} $selected={displaySection === "search" ? true : false}>
                    <SidebarIconContainer>
                        <SearchIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Search</SidebarOptionText>
                </SidebarOption>
            </Sidebar>
            <Main>
                {(displaySection === "all" || displaySection === "requests") && <FriendsCardContainer>
                    <MainHeader>Sent Friend Requests</MainHeader>
                    <AllFriends>
                        {mappedSentFriendRequests[0] && mappedSentFriendRequests.length > 0 ? mappedSentFriendRequests : <NoFriendsText>No sent requests.</NoFriendsText>}
                    </AllFriends>
                    <MainHeader>Received Friend Requests</MainHeader>
                    <AllFriends>
                        {mappedReceivedFriendRequests[0] && mappedReceivedFriendRequests.length > 0 ? mappedReceivedFriendRequests : <NoFriendsText>No received requests.</NoFriendsText>}
                    </AllFriends>
                </FriendsCardContainer>}
                {(displaySection === "all" || displaySection === "friends") && <FriendsCardContainer>
                    <MainHeader>All Friends</MainHeader>
                    <AllFriends>
                        {mappedAllFriends.length > 0 ? mappedAllFriends : <NoFriendsText>No Friends</NoFriendsText>}
                    </AllFriends>
                </FriendsCardContainer>}
                {displaySection === "search" && <FriendsCardContainer>
                    <Searchbar onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Search for friends"/>
                    <AllFriends>
                        {mappedSearchResults.length > 0 ? 
                         mappedSearchResults : 
                        searchTerm.length > 0 ? <NoFriendsText>No Results</NoFriendsText> :
                        ""
                    }
                    </AllFriends>
                </FriendsCardContainer>}
            </Main>
        </FriendsContainer>
    )
}

const FriendsContainer = styled.main`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
`

const Sidebar = styled(PrimaryContainer)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`

const SidebarHeader = styled.p`
    font-size: 1.5rem;
    font-weight: bolder;
    margin-bottom: 20px;
`

const SidebarOption = styled.div<({$selected: boolean})>`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:hover {
        background-color: var(--hover-orange-background);
        p {color: white}
    }
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    ${(props) => props.$selected ? "background-color: var(--primary-orange); p {color: white}" : ""}
`

const SidebarIconContainer = styled.div`
    padding: 5px;
    background-color: var(--primary-grey);
    border-radius: 50%;
`

const SidebarOptionText = styled.p`
    margin-left: 10px;
    font-size: 1.3rem;
`

const Main = styled.div`
    padding: 20px;
`

const MainHeader = styled.p`
    font-size: 1.2rem;
    font-weight: bolder;
    margin-bottom: 20px;
`

const FriendsCardContainer = styled.div`
    margin-bottom: 30px;
`

const AllFriends = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 30px;
    @media (max-width: 979px) { 
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 767px) { 
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 479px) { 
        grid-template-columns: 1fr;
    }
`

const Friend = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        width: 100%;
        margin-top: 10px;
    }
`

const FriendName = styled.p`
    font-weight: bold;
    margin-top: 5px;
    text-align: center;
    &:hover {
        text-decoration: underline;
        cursor: pointer;

    }
`

const AlreadyFriendsText = styled.p`
    font-size: 1.3rem;
    margin-top: 10px;
    display: flex;
    align-items: center;
`

const NoFriendsText = styled.p`
    font-size: 1.2rem;

`

const Searchbar = styled(MainInput)`
    width: calc(100% - 200px);
    border-radius: 10px;
    height: 40px;
    font-size: 1.3rem;
    @media (max-width: 979px) { 
        width: 100%;
    }
`

