import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import {v4 as uuidv4} from 'uuid';
import { PrimaryContainer } from "../main-styles/Containers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { CommentInterface, PostInterface, UserPostInterface } from "../../lib/interfaces";
import { BlueButton } from "../main-styles/Inputs";
import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function Post(props: {url: String, post_id: string}) {

    const globalUser = useSelector((state: RootState) => state.user);
    const [post, setPost] = useState({
        _id: "",
        name: "",
        date: "",
        time: "",
        text: "",
        profile_img_link: "",
        comments: [],
    });
    const [mappedComments, setMappedComments] = useState([]);
    const [comment, setComment] = useState("");
    const [sendComment, setSendComment] = useState(false);
    const [showComments, setShowComments] = useState(false);

    function addMappedComments(comments: CommentInterface[]) {
        return comments.map((comment) => {
            return <Comment 
                key={uuidv4()}
                url={props.url}
                comment={comment}
            />
        })
    } 

    useEffect(() => {
        try {
            async function getPost() {
                const url = props.url + "/get-post";
                await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({post_id: props.post_id})
                }).then((res) => res.json())
                .then((res) => {
                    setPost(res.post);
                    setMappedComments(addMappedComments(res.post.comments));
                }).catch((err) => console.log(err));
            }
            getPost();

            if (sendComment) {
                const url = props.url + "/add-comment";
                async function addComment() {
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: globalUser.email, name: globalUser.name, post_id: post._id, comment: comment})
                    }).then((res) => res.json())
                    .then(() => {
                        setSendComment(false);
                    }).catch((err) => console.log(err));
                }
                addComment();
            }
        } catch(err) {
            console.log(err);
        }
    }, [sendComment])



    function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComment(e.target.value);
    }

    function handleCommentSubmit() {
        setSendComment(true);
    }

    return (
        <PostContainer>
            <PostHeader>
                <ProfilePic width={"50px"} height={"50px"} hasEdit={false} profile_img_link={post.profile_img_link}/>
                <PostInfo>
                    <Name>{post.name}</Name>
                    <PostDate>{post.date}</PostDate>
                </PostInfo>
            </PostHeader>
            <PostText>
                {post.text}
            </PostText>
            {mappedComments.length > 2 && <CommentHeader onClick={() => setShowComments((prev) => !prev)}>{showComments ? "Hide" : "Show"} Comments</CommentHeader>}
            <CommentSection>
                {(mappedComments.length <= 2 || showComments) && <Comments>
                    {mappedComments}
                </Comments>}
                <SubmitCommentContainer>
                    <ProfilePic width={"40px"} height={"40px"} hasEdit={false} profile_img_link={globalUser.profile_img_link}/>{/* This is a placeholder for the user's profile pic */}
                    <CommentInput 
                        onChange={handleCommentChange}
                        value={comment}
                        placeholder="Write a comment..."
                    />
                    <CommentButton onClick={handleCommentSubmit} >Comment</CommentButton>
                </SubmitCommentContainer>
            </CommentSection>
        </PostContainer>
    )
}

const PostContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

const PostHeader = styled.div`
    display: flex;
    margin-bottom: 15px;
`

const PostInfo = styled.div`
    margin-left: 10px;
`

const Name = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`

const PostDate = styled.p`
    
`

const PostText = styled.p`

`

const CommentSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    justify-content: space-between;
`

const Comments = styled.div`
    max-height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
`

const CommentHeader = styled.p`
    margin-top: 10px;
    font-weight: bold;
    text-decoration: underline;
`

const SubmitCommentContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`

const CommentInput = styled.input`
    width: 60%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    margin-right: 10px;
    margin-left: 10px;
    background-color: var(--secondary-color);
`

const CommentButton = styled(BlueButton)`

`