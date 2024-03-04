import styled from "styled-components";
import { CommentInterface } from "../../lib/interfaces";
import { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";

export default function Comment(props: {url: String, comment: CommentInterface, handlePostNameClick: Function}) {

    const [deleteComment, setDeleteComment] = useState(false);

    //implement delete functionality here
    useEffect(() => {
        try {
            if (deleteComment) {
                const url = props.url + "/delete-comment";
                async function deleteComment() {
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({comment_id: props.comment._id})
                    }).then((res) => res.json())
                    .then(() => {
                        setDeleteComment(false);
                    }).catch((err) => console.log(err));
                }
                deleteComment();
            }
        } catch(err) {
            console.log(err);
        }
    }, [deleteComment])

    return (
        <CommentContainer>
            <ProfilePic width="40px" height="40px" hasEdit={false} profile_img_link={props.comment.profile_img_link} />
            <CommentBodyContainer>
                <CommentName onClick={() => props.handlePostNameClick(props.comment.email)}>{props.comment.name}</CommentName>
                <CommentText>{props.comment.text}</CommentText>
                {/* <p>{props.comment.date}</p> */}
            </CommentBodyContainer>
            <CommentText>
            </CommentText>

        </CommentContainer>
    )
}

const CommentContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
`
const CommentBodyContainer = styled.div`
    margin-left: 10px;
`

const CommentName = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

const CommentText = styled.p`
    color: var(--primary-text-color);
`