import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { PrimaryContainer } from '../main-styles/Containers';
import Post from './Post';
import { PostIDInterface } from '../../lib/interfaces';


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
            {mappedPosts}
        </FeedContainer>
    )
}

export const FeedContainer = styled.div`
    
`