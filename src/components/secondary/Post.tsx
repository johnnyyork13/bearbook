import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import {v4 as uuidv4} from 'uuid';
import { PrimaryContainer } from "../main-styles/Containers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { CommentInterface, PostInterface } from "../../lib/interfaces";
import { MainButton } from "../main-styles/Inputs";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Comment from "./Comment";
import DeleteConfirmModal from "../secondary/DeleteConfirmModal";

export default function Post(props: {url: String, post_id: string, setLoadProfile: Function}) {

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
    const [mappedComments, setMappedComments] = useState<any[]>([]);
    const [comment, setComment] = useState("");
    const [sendComment, setSendComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletePost, setDeletePost] = useState(false);

    function addMappedComments(comments: CommentInterface[]) {
        return comments.map((comment: CommentInterface) => {
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

    useEffect(() => {
        if (deletePost) {
            const url = props.url + "/delete-post";
            async function deletePost() {
                await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({post_id: post._id})
                }).then((res) => res.json())
                .then(() => {
                    setDeletePost(false);
                    props.setLoadProfile(false);
                }).catch((err) => console.log(err));
            }
            deletePost();
        }
    }, [deletePost])



    function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
        setComment(e.target.value);
    }

    function handleCommentSubmit() {
        setSendComment(true);
    }

    function handleDeletePost() {
        setShowDeleteModal(true);
    }

    return (
        <PostContainer>
            {showDeleteModal && 
                <DeleteConfirmModal
                    mainText="Are you sure you want to delete this post?"
                    buttonText="Confirm"
                    buttonFunc={() => {setDeletePost(true); setShowDeleteModal(false)}}
                    closeFunc={() => setShowDeleteModal(false)}
                />
            }
            <PostHeader>
                <ProfilePic width={"50px"} height={"50px"} hasEdit={false} profile_img_link={post.profile_img_link}/>
                <PostInfo>
                    <Name>{post.name}</Name>
                    <PostDate>{post.date}</PostDate>
                </PostInfo>
                <DeletePost onClick={handleDeletePost}><CloseIcon /></DeletePost>
            </PostHeader>
            <PostText>
                {post.text}
            </PostText>
            <CommentSection>
                <Comments>
                    {mappedComments.length > 0 && mappedComments[0]}
                    {mappedComments.length > 1 && mappedComments[1]}
                    {showComments && mappedComments.slice(2)}
                </Comments>
                {mappedComments.length > 2 && <CommentHeader onClick={() => setShowComments((prev) => !prev)}>{showComments ? "Hide" : "Show more"} comments</CommentHeader>}
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
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

const PostHeader = styled.div`
    display: flex;
    margin-bottom: 15px;
    &:hover button {
        visibility: visible;
    }
`

const DeletePost = styled.button`
    margin-left: auto;
    background-color: var(--primary-color);
    border: none;
    visibility: hidden;
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
    cursor: pointer;
`

const SubmitCommentContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`

const CommentInput = styled.input`
    width: 90%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    margin-right: 10px;
    margin-left: 10px;
    background-color: var(--secondary-color);
`

const CommentButton = styled(MainButton)`

`