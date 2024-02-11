import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { PrimaryContainer } from '../main-styles/Containers';
import { NavLink } from 'react-router-dom';

const Header = styled(PrimaryContainer)`
    grid-area: header;
    border-radius: 0px;
`

export default function HeaderMain(props) {

    return (
        <Header>
            <div><NavLink to="/profile">Profile</NavLink></div>
            <div><NavLink to="/signup">Signup</NavLink></div>
            <div><NavLink to="/login">Login</NavLink></div>
        </Header>
    )
}