import styled from "styled-components";
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setGlobalUser, updateGlobalUser } from '../../state/user/userSlice';
import {v4 as uuidv4} from 'uuid';
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { MainButton, SecondaryButton } from "../main-styles/Inputs";
import { useNavigate } from "react-router-dom";


export default function Settings(props: {url: String}) {

    const navigate = useNavigate();

    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const [loadParent, setLoadParent] = useState(false);
    const [settingSection, setSettingSection] = useState("preferences");
    const [settings, setSettings] = useState({
        theme: "",
        profile_visibility: "",
        show_posts: "",
        show_major: "",
        show_location: "",
    })
    const [updateSettings, setUpdateSettings] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState(false);

    useEffect(() => {
        try {
            if (globalUser.email !== "") {
                async function getUserSettings() {
                    const url = props.url + "/get-settings";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email: globalUser.email})
                        }).then((res) => res.json())
                        .then((res) => {
                            setSettings(res.settings);
                        }).catch((err) => console.log(err));
                    }
                    getUserSettings();
                }
        } catch(err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        if (updateSettings) {
            try {
                async function updateUserSettings() {
                    const url = props.url + "/update-settings";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email: globalUser.email, settings: settings})
                    }).then((res) => res.json())
                    .then((res) => {
                        dispatch(setGlobalUser(res.user));
                        setUpdateSettings(false)
                    })
                    .catch((err) => console.log(err));
                }
                updateUserSettings();
            } catch(err) {
                console.log(err);
            }
        }
    }, [updateSettings])

    useEffect(() => {
        if (deleteAccount) {
            try {
                async function deleteUserAccount() {
                    const url = props.url + "/delete-account";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email: globalUser.email})
                    }).then((res) => res.json())
                    .then(() => {
                        navigate("/login");
                        setShowDeleteAccountModal(false);
                    })
                }
                deleteUserAccount();
            } catch(err) {
                console.log(err);
            }
        }
    }, [deleteAccount])

    function handleUpdateSettings(prop: string, val: string) {
        setSettings((prev) => ({...prev, [prop]: val}));
        setUpdateSettings(true);
    }

    return (
        <SettingsContainer>
            {showDeleteAccountModal &&
            <OpacityBackground>
                <DeleteAccountModal>
                    <p>Are you sure you want to delete your account?</p>
                    <div>
                        <SecondaryButton onClick={() => setShowDeleteAccountModal(false)}>Back</SecondaryButton>
                        <MainButton onClick={() => setDeleteAccount(true)}>Confirm Delete</MainButton>
                    </div>
                </DeleteAccountModal>
            </OpacityBackground>
            }
            <Sidebar>
                <SidebarHeader>Settings</SidebarHeader>
                <SidebarOption onClick={() => setSettingSection("preferences")} $selected={settingSection === "preferences" ? true : false}>
                    <SidebarIconContainer>
                        <SettingsIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Preferences</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setSettingSection("privacy")} $selected={settingSection === "privacy" ? true : false}>
                    <SidebarIconContainer>
                        <SecurityIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Privacy</SidebarOptionText>
                </SidebarOption>
            </Sidebar>
            <Main>
                {settingSection === "preferences" && 
                <>
                    <MainHeader>Preferences</MainHeader>
                    <MainSection>
                        <div>
                            <MainSectionHeader>Dark Mode</MainSectionHeader>
                            <MainSectionText>Adjust the appearance of MyBear to reduce glare and give your eyes a break.</MainSectionText>
                        </div>
                        {settings.theme === "light" ? 
                            <SecondaryButton onClick={() => handleUpdateSettings("theme", "dark")}>Off</SecondaryButton> : 
                            <MainButton onClick={() => handleUpdateSettings("theme", "light")}>On</MainButton> }
                    </MainSection>
                </>
                }
                {settingSection === "privacy" &&
                <>
                    <MainHeader>Privacy</MainHeader>
                    <MainSection>
                        <div>
                            <MainSectionHeader>Profile Visibility</MainSectionHeader>
                            <MainSectionText>Allow non-friends to search for your profile.</MainSectionText>
                        </div>
                        {settings.profile_visibility === "public" ? 
                            <SecondaryButton onClick={() => handleUpdateSettings("profile_visibility", "private")}>Public</SecondaryButton> :
                            <MainButton onClick={() => handleUpdateSettings("profile_visibility", "public")}>Private</MainButton>}
                    </MainSection>
                    <MainSection>
                        <div>
                            <MainSectionHeader>Share Posts</MainSectionHeader>
                            <MainSectionText>Allow non-friends to see your posts.</MainSectionText>
                        </div>
                        {settings.show_posts === "public" ? 
                            <SecondaryButton onClick={() => handleUpdateSettings("show_posts", "private")}>Public</SecondaryButton> :
                            <MainButton onClick={() => handleUpdateSettings("show_posts", "public")}>Private</MainButton>}
                    </MainSection>
                    <MainSection>
                        <div>
                            <MainSectionHeader>Show Major</MainSectionHeader>
                            <MainSectionText>Allow major to be visible on profile.</MainSectionText>
                        </div>
                        {settings.show_major === "public" ? 
                            <SecondaryButton onClick={() => handleUpdateSettings("show_major", "private")}>Public</SecondaryButton> :
                            <MainButton onClick={() => handleUpdateSettings("show_major", "public")}>Private</MainButton>}
                    </MainSection>
                    <MainSection>
                        <div>
                            <MainSectionHeader>Show Location</MainSectionHeader>
                            <MainSectionText>Allow address to be visible on profile.</MainSectionText>
                        </div>
                        {settings.show_location === "public" ? 
                            <SecondaryButton onClick={() => handleUpdateSettings("show_location", "private")}>Public</SecondaryButton> :
                            <MainButton onClick={() => handleUpdateSettings("show_location", "public")}>Private</MainButton>}
                    </MainSection>
                    <MainSection>
                        <div>
                            <MainSectionHeader>Delete Account</MainSectionHeader>
                            <MainSectionText>Completely remove account from MyBear.</MainSectionText>
                        </div>
                        <MainButton onClick={() => setShowDeleteAccountModal(true)}>Remove Account</MainButton>
                    </MainSection>
                </>
                }
            </Main>
        </SettingsContainer>
    )
}

const SettingsContainer = styled.main`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    @media (max-width: 979px) { 
        grid-template-columns: 1fr;
        grid-template-rows: auto;
    }
`

const DeleteAccountModal = styled(PrimaryContainer)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p {
        margin-bottom: 20px;
    }
    div {
        display: flex;
        gap: 20px;
    }
`

const Sidebar = styled(PrimaryContainer)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    @media (max-width: 979px) { 
        height: fit-content;
    }
`

const SidebarHeader = styled.p`
    font-size: 1.5rem;
    font-weight: bolder;
    margin-bottom: 20px;
`

const SidebarOption = styled.div<({$selected: boolean})>`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    &:hover {
        background-color: var(--hover-orange-background);
        p {color: white}
    }
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    ${(props) => props.$selected ? "background-color: var(--primary-orange); p {color: white}" : ""}
`

const SidebarIconContainer = styled.div`
    padding: 5px;
    background-color: var(--primary-grey);
    border-radius: 50%;
`

const SidebarOptionText = styled.p`
    margin-left: 10px;
    font-size: 1.3rem;
`

const Main = styled.div`
    padding: 20px;
    padding-right: 200px;
    background-color: var(--secondary-color);
    @media (max-width: 979px) { 
        padding: 20px;
        button {
            margin-left: 5px;
        }
    }
`

const MainHeader = styled.p`
    font-size: 1.2rem;
    font-weight: bolder;
    margin-bottom: 20px;
`

const MainSection = styled(PrimaryContainer)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`

const MainSectionHeader = styled.p`
    font-weight: bolder;
    margin-bottom: 10px;
`

const MainSectionText = styled.p`

`