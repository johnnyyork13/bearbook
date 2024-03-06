import {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { PrimaryContainer } from '../main-styles/Containers';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logo } from '../main-styles/Logo';
import MessageIcon from '@mui/icons-material/Message';
import Person2Icon from '@mui/icons-material/Person2';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import SearchResult from '../secondary/SearchResult';
import {v4 as uuidv4} from 'uuid';
import { updateGlobalUser } from '../../state/user/userSlice';
import Messages from './Messages';
import ChatWindow from './ChatWindow';

export default function HeaderMain(props: {url: string, chatWindow: {show: boolean, email: string, name: string}, setChatWindow: Function}) {

    const navigate = useNavigate();
    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [showMessages, setShowMessages] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedName, setSelectedName] = useState({
        selected: false,
        email: "",
    });

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    } 

    function handleSelectSearchItem(email: string) {
        setSelectedName({
            selected: true,
            email: email,
        })
    }

    useEffect(() => {
        try {
            if (query.length > 0) {
                async function getSearchResults() {
                    const url = props.url + "/search";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({name: query})
                    }).then((res) => res.json())
                    .then((res) => setResults(res.results))
                    .catch((err) => console.log(err));
                }
                getSearchResults();
            }
        } catch(err) {
            console.log(err);
        }
    }, [query])

    useEffect(() => {
        if (selectedName.selected) {
            dispatch(updateGlobalUser({
                ...globalUser,
                visiting: selectedName.email,
            }))
            navigate('/profile');
            setQuery("");
        }
    }, [selectedName])

    interface SearchResultInterface {
        name: string,
        email: string,
        handleSelectSearchTerm: Function,
        profile_img_link: string,
    }

    const mappedResults = results.map((result: SearchResultInterface) => {
        return <SearchResult
                    key={uuidv4()}
                    name={result.name}
                    email={result.email}
                    profile_img_link={result.profile_img_link}
                    handleSelectSearchItem={handleSelectSearchItem}
                    setFocused={setFocused}
                />
    })

    return (
        <Header>
            <SearchContainer>
                <NavLink style={{textDecoration: "none"}} to="/home"><HeaderLogo>MyBear</HeaderLogo></NavLink>
                <SearchBarContainer>
                    <SearchIcon />
                    <Searchbar value={query} onFocus={onFocus} onBlur={onBlur} onChange={handleSearchInputChange} placeholder="Search for other Bears"/>
                </SearchBarContainer>
                
                {query.length > 0 && focused && <SearchResultsContainer>
                    {mappedResults.length > 0 ? mappedResults : "No matches..."}
                </SearchResultsContainer>}
            </SearchContainer>
            <LinkContainer>
                <Link><NavLink to="/friends"><IconContainer><GroupIcon /></IconContainer></NavLink></Link> 
                <Link onClick={() => setShowMessages((prev: boolean) => !prev)}><IconContainer><MessageIcon /></IconContainer></Link>
                <Link onClick={() => dispatch(updateGlobalUser({...globalUser, visiting: ""}))}><NavLink to="/profile"><IconContainer><Person2Icon /></IconContainer></NavLink></Link>
                <NavLink to="/logout">Logout</NavLink>
            </LinkContainer>
            {showMessages && <Messages url={props.url} setChatWindow={props.setChatWindow} setShowMessages={setShowMessages}/>}
            {props.chatWindow.show && <ChatWindow url={props.url} email={props.chatWindow.email} contactName={props.chatWindow.name} setChatWindow={props.setChatWindow}/>}
        </Header>
    )
}

const Header = styled(PrimaryContainer)`
    border-radius: 0px;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-orange);
    position: relative;
`

const HeaderLogo = styled(Logo)`
    font-size: 2.2rem;
    font-weight: bolder;
    text-decoration: none !important;
    color: white;
`

const SearchContainer = styled.div`
    a {
        margin-right: 20px;
    }
    height: 64px;
    width: 50%;
    display: flex;
    align-items: center;
    position: relative;
`

const SearchBarContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    svg {
        position: absolute;
        left: 10px;
        color: var(--border-color);
    }
`

const Searchbar = styled.input`
    font-size: 1.2rem;
    height: 35px;
    width: 90%;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    padding-left: 30px;
    padding-right: 10px;
    margin-left: 5px;
`

const SearchResultsContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: -20px;
    border-radius: 0px;
    width: 430px;
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
    cursor: pointer;
    &:hover {
        background-color: var(--);
    }
`

const IconContainer = styled.div`
    &:visited {
        color: black;
    }
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`