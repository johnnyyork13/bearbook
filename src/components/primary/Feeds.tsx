import styled from "styled-components";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import Post from "../secondary/Post";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import {v4 as uuidv4} from 'uuid';
import { PrimaryContainer } from "../main-styles/Containers";
import PostPlaceholder from "../secondary/PostPlaceholder";


export default function Feeds(props: {url: String}) {

    const globalUser = useSelector((state: RootState) => state.user);

    const [posts, setPosts] = useState([]);
    const [postType, setPostType] = useState({
        send: true,
        type: "all",
    });
    const [postsLoaded, setPostsLoaded] = useState(false);

    useEffect(() => {
        try {
            if (postType.send) {
                async function getPosts() {
                    const url = props.url + "/get-feed";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: globalUser.email, postType: postType.type})
                    }).then((res) => res.json())
                    .then((res) => {
                        setPosts(res.posts);
                        setPostType((prev) => ({...prev, send: false}))
                        setPostsLoaded(true);
                    }).catch((err) => console.log(err));
                }
                getPosts();
            }
        } catch(err) {
            console.log(err);
        }
    }, [postType.send])


    const mappedPosts = posts.map((post: any) => {
        return <Post key={uuidv4()} url={props.url} post_id={post._id} setLoadParent={() => {}}/>
    })

    return (
        <FeedsContainer>
            <Sidebar>
                <SidebarHeader>Feeds</SidebarHeader>
                <SidebarOption onClick={() => setPostType({send: true, type: "all"})} $selected={postType.type === "all" ? true : false}>
                    <SidebarIconContainer>
                        <DynamicFeedIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>All Posts</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setPostType({send: true, type: "faculty"})} $selected={postType.type === "faculty" ? true : false}>
                    <SidebarIconContainer>
                        <GroupsIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Faculty</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setPostType({send: true, type: "students"})} $selected={postType.type === "students" ? true : false}>
                    <SidebarIconContainer>
                        <PeopleAltIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Students</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setPostType({send: true, type: "staff"})} $selected={postType.type === "staff" ? true : false}>
                    <SidebarIconContainer>
                        <Diversity3Icon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Staff</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setPostType({send: true, type: "user"})} $selected={postType.type === "user" ? true : false}>
                    <SidebarIconContainer>
                        <PersonIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>My Posts</SidebarOptionText>
                </SidebarOption>
            </Sidebar>
            <Main>
                {postsLoaded ? mappedPosts : <><PostPlaceholder /><PostPlaceholder /><PostPlaceholder /></>}
            </Main>
        </FeedsContainer>
    )
}

const FeedsContainer = styled.main`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    @media (max-width: 979px) { 
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
`

const Sidebar = styled(PrimaryContainer)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    height: fit-content;
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
    padding-right: 200px;
    @media (max-width: 979px) { 
        padding: 20px;
        &> div {
            padding: 20px;
            width: auto;
        }
    }
`