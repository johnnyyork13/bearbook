import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { PrimaryContainer } from '../main-styles/Containers';
import Post from './Post';
import { PostIDInterface } from '../../lib/interfaces';
import { Link } from 'react-router-dom';


export default function Feed(props: {url: String}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            async function getFeed() {
                const url = props.url + "/get-main-feed";
                await fetch(url, {
                    credentials: "include",
                }).then((res) => res.json())
                .then((res) => {
                    setPosts(res.posts);
                }).catch((err) => console.log(err));
            }
            getFeed();
        } catch(err) {
            console.log(err);
        }
    }, [])

    const mappedPosts = posts.map((post: PostIDInterface) => {
        return (
            <Post 
                key={post._id}
                url={props.url}
                post_id={post._id}
                setLoadProfile={() => {}}
            />
        )
    })

    return (
        <FeedContainer>
            {mappedPosts.length > 0 ? mappedPosts : 
                <>
                    <NoPostsText>Friend's Posts Show up Here.</NoPostsText>
                    <NoPostsText><Link to="/friends" >Find Friends</Link></NoPostsText>
                </>
            }
        </FeedContainer>
    )
}

export const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const NoPostsText = styled.p`
    font-size: 1.2rem;
    margin-top: 20px;
`