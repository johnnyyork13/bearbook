import {useEffect, useState, FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Contacts from "../secondary/Contacts";
import Feed from "../secondary/Feed";
import Sidebar from "../secondary/Sidebar";
import { PropaneSharp } from "@mui/icons-material";

export default function Home(props: {url: String, setChatWindow: Function}) {

    const navigate = useNavigate();
    const globalUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!globalUser.loggedIn) {
            navigate("/login");
        }
    }, [])
    return (
        <HomeContainer>
            <Sidebar />
            <Feed url={props.url}/>
            <Contacts url={props.url} setChatWindow={props.setChatWindow}/>
        </HomeContainer>
    )
}

const HomeContainer = styled.main`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 20px;
    padding: 20px;
`