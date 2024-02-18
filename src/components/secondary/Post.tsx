import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import { PrimaryContainer } from "../main-styles/Containers";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';

export default function Post(props: {name: string, date: string, time: string, text: string, profile_img_link: string}) {

    const globalUser = useSelector((state: RootState) => state.user);

    return (
        <PostContainer>
            <PostHeader>
                <ProfilePic width={"50px"} height={"50px"} hasEdit={false} profile_img_link={props.profile_img_link}/>
                <PostInfo>
                    <Name>{props.name}</Name>
                    <PostDate>{props.date}</PostDate>
                </PostInfo>
            </PostHeader>
            <PostText>
                {props.text}
            </PostText>

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