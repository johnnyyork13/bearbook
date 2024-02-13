import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { PrimaryContainer } from '../main-styles/Containers';
import { NavLink } from 'react-router-dom';

import { Logo } from '../main-styles/Logo';
import MessageIcon from '@mui/icons-material/Message';
import Person2Icon from '@mui/icons-material/Person2';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';

export default function HeaderMain() {

    return (
        <Header>
            <NavLink style={{textDecoration: "none"}} to="/home"><HeaderLogo>HistoryBook</HeaderLogo></NavLink>
            <SearchContainer>
                <SearchIcon />
                <Searchbar placeholder="Search for a Historical Figure"/>
            </SearchContainer>
            <LinkContainer>
                <Link><NavLink to=""><IconContainer><GroupIcon /></IconContainer></NavLink></Link> 
                <Link><NavLink to=""><IconContainer><MessageIcon /></IconContainer></NavLink></Link>
                <Link><NavLink to=""><IconContainer><Person2Icon /></IconContainer></NavLink></Link>
            </LinkContainer>

        </Header>
    )
}

const Header = styled(PrimaryContainer)`
    border-radius: 0px;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderLogo = styled(Logo)`
    font-size: 2.2rem;
    font-weight: bolder;
    text-decoration: none !important;
`

const SearchContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
`
const Searchbar = styled.input`
    font-size: 1.2rem;
    height: 35px;
    width: 90%;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 5px;
`

const LinkContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

const Link = styled.div`
    margin-right: 10px;
    padding: 10px;
    background-color: var(--secondary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const IconContainer = styled.a`
    &:visited {
        color: black;
    }
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`