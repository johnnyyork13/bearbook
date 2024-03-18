import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Post from './Post';
import { PostIDInterface } from '../../lib/interfaces';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export default function Feed(props: {url: String}) {

    const [posts, setPosts] = useState([]);
    const globalUser = useSelector((state: RootState) => state.user);
    const [loadAmount, setLoadAmount] = useState(5);
    useEffect(() => {
        if (globalUser.email) {
            try {
                async function getFeed() {
                    const url = props.url + "/get-main-feed";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: globalUser.email,
                        })
                    }).then((res) => res.json())
                    .then((res) => {
                        setPosts(res.posts);
                    }).catch((err) => console.log(err));
                }
                getFeed();
            } catch(err) {
                console.log(err);
            }
        }
    }, [])

    const mappedPosts = posts.map((post: PostIDInterface) => {
        return (
            <Post 
                key={post._id}
                url={props.url}
                post_id={post._id}
                setLoadParent={() => {}}
            />
        )
    })

    return (
        <FeedContainer>
            {mappedPosts.length > 0 ? mappedPosts.slice(0, loadAmount) : 
                <>
                    <NoPostsText>No Posts yet.</NoPostsText>
                    <NoPostsText><Link to="/friends" >Find Friends</Link></NoPostsText>
                </>
            }
            {mappedPosts.length > loadAmount && 
                <LoadMoreText onClick={() => setLoadAmount(loadAmount + 3)}>Load More Posts</LoadMoreText>}
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

const LoadMoreText = styled.p`
    font-size: 1.2rem;
    margin-top: 20px;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`