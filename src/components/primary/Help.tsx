import styled from "styled-components";
import InfoIcon from '@mui/icons-material/Info';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from "react";
import { PrimaryContainer } from "../main-styles/Containers";
import { MainInput, SecondaryButton } from "../main-styles/Inputs";


export default function Help() {

    const [helpSection, setHelpSection] = useState("about");


    return (
        <HelpContainer>
            <Sidebar>
                <SidebarHeader>Help</SidebarHeader>
                <SidebarOption onClick={() => setHelpSection("about")} $selected={helpSection === "about" ? true: false}>
                    <SidebarIconContainer>
                        <InfoIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>About MyBear</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setHelpSection("FAQ")} $selected={helpSection === "FAQ" ? true: false}>
                    <SidebarIconContainer>
                        <LiveHelpIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>FAQ</SidebarOptionText>
                </SidebarOption>
                <SidebarOption onClick={() => setHelpSection("report")} $selected={helpSection === "report" ? true: false}>
                    <SidebarIconContainer>
                        <ReportProblemIcon />
                    </SidebarIconContainer>
                    <SidebarOptionText>Report a Problem</SidebarOptionText>
                </SidebarOption>
            </Sidebar>
            <Main>
                {helpSection === "about" &&
                    <>
                        <MainHeader>About</MainHeader>
                        <MainSection>
                            <div>
                                <MainSectionHeader>What is MyBear?</MainSectionHeader>
                                <MainSectionText>MyBear is a social media platform for Mercer students, teachers, and faculty.</MainSectionText>
                                <MainSectionText>Our goal is to simplify the process of locating vital student resources, as well as make it easier to contact other Mercerians.</MainSectionText>
                            </div>
                        </MainSection>
                    </>
                }
                {helpSection === "FAQ" && 
                    <>
                        <MainHeader>FAQ</MainHeader>
                        <MainSection>
                            <div>
                                <MainSectionHeader>How do I use MyBear?</MainSectionHeader>
                                <MainSectionText>MyBear was modeled after Facebook, so many of the actions and processes that can be performed are identical.</MainSectionText>
                                <MainSectionText>For example, you can add friends, message friends, and create or comment on posts.</MainSectionText>
                            </div>
                        </MainSection>
                        <MainSection>
                            <div>
                                <MainSectionHeader>Will there be Future Updates?</MainSectionHeader>
                                <MainSectionText>Since MyBear was developed to grow my abilities in full stack development, I may revisit this project in the future and add features.</MainSectionText>
                                <MainSectionText>In the meantime, I hope you enjoyed testing my application and I look forward to your feedback!</MainSectionText>
                            </div>
                        </MainSection>
                    </>
                }
                {helpSection === "report" &&
                    <>
                        <MainHeader>Report a Problem</MainHeader>
                        <MainSection>
                            <div>
                                <MainSectionHeader>Problem Description</MainSectionHeader>
                                <MainInput placeholder="Enter a description of the problem" />
                                <MainSectionHeader>Your Email</MainSectionHeader>
                                <MainInput placeholder="Enter your email" />
                                <SecondaryButton>Submit</SecondaryButton>
                            </div>
                        </MainSection>
                    </>
                }
            </Main>
        </HelpContainer>
    )
}

const HelpContainer = styled.main`
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    @media (max-width: 979px) { 
        grid-template-rows: auto;
        grid-template-columns: 1fr;
    }
`

const Sidebar = styled(PrimaryContainer)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    height: fit-content;
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
    @media (max-width: 979px) { 
        padding: 20px;
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
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        input {
            margin-bottom: 10px;
            background-color: white;
            width: 100%;
        }
        button {
            width: 200px;
            align-self: flex-end;
        }
    }
`

const MainSectionHeader = styled.p`
    font-weight: bolder;
    margin-bottom: 10px;
`

const MainSectionText = styled.p`
    margin-top: 10px;
`