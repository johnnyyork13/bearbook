import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import Person2Icon from '@mui/icons-material/Person2';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector, useDispatch} from "react-redux";
import { RootState, AppDispatch} from "../../state/store";
import { useNavigate } from "react-router-dom";
import { setGlobalUser } from "../../state/user/userSlice";
import { useEffect, useState } from "react";

export default function UserSettings(props: {url: string, setOpenUserSettings: Function}) {

    const navigate = useNavigate();
    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        if (logout) {
            try {
                async function logoutUser() {
                    const url = props.url + "/logout";
                    await fetch(url, {
                        credentials: "include",
                        mode: "cors",
                    }).then((res) => res.json())
                    .then(() => {
                        setLogout(false);
                        navigate("/login");
                    })
                }
                logoutUser();
            } catch(err) {
                console.log(err);
            }
        }
    }, [logout])

    return (
        <UserSettingsContainer>
            <Section onClick={() => {
                    dispatch(setGlobalUser({...globalUser, visiting: ""})); 
                    navigate("/profile")
                    props.setOpenUserSettings(false);
                }}>
                <Person2Icon />
                <SectionText>Profile</SectionText>
            </Section>
            <Section>
                <SchoolIcon />
                <SectionText>Mercer Resources</SectionText>
            </Section>
            <Section>
                <SettingsIcon />
                <SectionText>Settings & Privacy</SectionText>
            </Section>
            <Section>
                <HelpIcon />
                <SectionText>Help & Support</SectionText>
            </Section>
            <Section onClick={() => setLogout(true)}>
                <LogoutIcon />
                <SectionText>Logout</SectionText>
            </Section>
        </UserSettingsContainer>
    )
}

const UserSettingsContainer = styled(PrimaryContainer)`
    position: absolute;
    right: 10px;
    top: 60px;
    width: 300px;
`

const Section = styled.section`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    &:hover {
        background-color: var(--hover-background);
    }
`

const SectionText = styled.p`
    margin-left: 10px;
    font-size: 1.2rem;
`
