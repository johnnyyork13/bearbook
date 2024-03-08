import {useState, useEffect, FC} from 'react';
import styled from 'styled-components'
import { SecondaryContainer } from '../main-styles/Containers';
import Person2Icon from '@mui/icons-material/Person2';
import GradeIcon from '@mui/icons-material/Grade';
import SchoolIcon from '@mui/icons-material/School';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { setGlobalUser } from '../../state/user/userSlice';
import ProfilePic from './ProfilePic';


export default function Sidebar() {

    const navigate = useNavigate();

    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>(); 

    function handleSidebarClick(route: string) {

    } 

    return (
        <SidebarContainer>
            <Span onClick={() => {dispatch(setGlobalUser({...globalUser, visiting: ""})); navigate("/profile")}}><ProfilePic width={"30px"} height={"30px"} profile_img_link={globalUser.profile_img_link} /><SpanText>{globalUser.firstName} {globalUser.lastName}</SpanText></Span>
            <Span onClick={() => navigate("/friends")}><GroupIcon /><SpanText>Friends</SpanText></Span>
            <Span onClick={() => navigate("/feeds")}><WebAssetIcon /><SpanText>Feeds</SpanText></Span>
            <Span onClick={() => navigate("/mercer")}><SchoolIcon /><SpanText>Mercer Dashboard</SpanText></Span>
        </SidebarContainer>
    )
}

const SidebarContainer = styled(SecondaryContainer)`
    background-color: var(--secondary-color);
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 50px;
    gap: 10px;
`

const Span = styled.span`
    display: flex;
    align-items: center;
    svg {
        width: 30px;
        height: 30px;
    }
    cursor: pointer;
    &:hover {
        background-color: var(--hover-background);
    }
    border-radius: 10px;
    padding: 5px;
`
const SpanText = styled.p`
    margin-left: 10px;
    font-size: 1.5rem;
`