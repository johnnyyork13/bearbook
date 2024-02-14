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

    const [query, setQuery] = useState("");
    const [id, setId] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const controller = new AbortController();
    const signal = controller.signal;

    useEffect(() => {
        try {
            const splitSearchOnSpaces = searchInput.split(" ");
            if (splitSearchOnSpaces.length > 1) {
                console.log('sending request for names ', splitSearchOnSpaces);
                //fix capitalization
                for (let i = 0; i < splitSearchOnSpaces.length; i++) {
                    if (splitSearchOnSpaces[i].length > 0) {
                        const e = splitSearchOnSpaces[i];
                        splitSearchOnSpaces[i] = e[0].toUpperCase() + e.slice(1).toLowerCase();
                    }
                }
                const properString = splitSearchOnSpaces.join(" ");
                async function getHumanNames() {
                    const query = `SELECT ?human ?humanLabel WHERE { ?human wdt:P31 wd:Q5; rdfs:label ?humanLabel. FILTER(LANG(?humanLabel) = "en"). FILTER(STRSTARTS(?humanLabel, "${properString}")). } LIMIT 5`
                    const url = `https://query.wikidata.org/sparql?format=json&query=${query}`;
                    await fetch(url, {
                        signal: signal,
                    })
                    .then((res) => res.json())
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
                }
                getHumanNames();
            }
        } catch(err) {
            console.log(err);
        }
        
    }, [searchInput])

    function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        controller.abort();
        setSearchInput(e.target.value);
    }

    return (
        <Header>
            <NavLink style={{textDecoration: "none"}} to="/home"><HeaderLogo>HistoryBook</HeaderLogo></NavLink>
            <SearchContainer>
                <SearchIcon />
                <Searchbar onChange={handleSearchInputChange} placeholder="Search for a Historical Figure"/>
            </SearchContainer>
            <LinkContainer>
                <Link><NavLink to=""><IconContainer><GroupIcon /></IconContainer></NavLink></Link> 
                <Link><NavLink to=""><IconContainer><MessageIcon /></IconContainer></NavLink></Link>
                <Link><NavLink to="/profile"><IconContainer><Person2Icon /></IconContainer></NavLink></Link>
                <NavLink to="/logout">Logout</NavLink>
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