import {useState, useEffect, FC} from 'react';
import styled from 'styled-components'
import { SecondaryContainer } from '../main-styles/Containers';
import Person2Icon from '@mui/icons-material/Person2';
import GradeIcon from '@mui/icons-material/Grade';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import MessageIcon from '@mui/icons-material/Message';
import GroupIcon from '@mui/icons-material/Group';



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
`
const SpanText = styled.p`
    margin-left: 10px;
    font-size: 1.5rem;
`

export default function Sidebar() {

    return (
        <SidebarContainer>
            <Span><Person2Icon /><SpanText>Profile</SpanText></Span>
            <Span><GroupIcon /><SpanText>Friends</SpanText></Span>
            <Span><MessageIcon /><SpanText>Messenger</SpanText></Span>
            <Span><WebAssetIcon /><SpanText>Feeds</SpanText></Span>
            <Span><GradeIcon /><SpanText>Saved Posts</SpanText></Span>
        </SidebarContainer>
    )
}