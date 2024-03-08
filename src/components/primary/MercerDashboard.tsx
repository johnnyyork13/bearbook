import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { ExitButton, MainButton } from "../main-styles/Inputs";
import {useSelector, useDispatch} from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import {v4 as uuidv4} from 'uuid';

export default function MercerDashboard(props: {url: String}) {

    const globalUser = useSelector((state: RootState) => state.user);
    const [expand, setExpand] = useState("")
    const [saveLink, setSaveLink] = useState({
        send: false,
        remove: false,
        link: "",
        title: "",
        name: "",
    })
    const [savedLinks, setSavedLinks] = useState([])

    useEffect(() => {
        try {
            async function getSavedLinks() {
                const url = props.url + '/get-saved-links';
                await fetch(url, {
                    method: "POST",
                    credentials: "include",
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: globalUser.email
                    })}).then((res) => res.json())
                    .then((res) => {
                        setSavedLinks(res.savedLinks);
                    }).catch((err) => console.log(err));
            }
            getSavedLinks();
        } catch(err) {
            console.log(err);
        }
    }, [saveLink.send])

    useEffect(() => {
        try {
            if (saveLink.send) {
                async function saveLinkToDB() {
                    const url = props.url + '/add-saved-link';
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...saveLink,
                            email: globalUser.email
                        })}).then((res) => res.json())
                        .then((res) => {
                            setSaveLink({send: false, link: "", name: "", title: "", remove: false,});
                            setSavedLinks(res.savedLinks);
                        }).catch((err) => console.log(err));
                    
                }
                saveLinkToDB();
            }
        } catch(err) {
            console.log(err);
        }
    }, [saveLink.send])

    function handleLinkClick(e) {
        const title = e.target.parentElement.parentElement.parentElement.children[0].innerText
        const name = e.target.parentElement.children[0].innerText;
        setSaveLink({
            send: true,
            link: e.target.parentElement.children[0].href,
            title: title,
            name: name,
            remove: false,
        })
    }

    const mappedSavedLinks = savedLinks && savedLinks.map((link: any) => {
        return <SavedLink key={uuidv4()} onClick={(() => window.open(link.link))}>
            <SavedLinkTitle><LinkTitleSpan>{link.title}</LinkTitleSpan><ExitButton onClick={() => setSaveLink({remove: true, send: true, name: link.name, title: link.title, link: link.link})}><CloseIcon /></ExitButton></SavedLinkTitle>
            <SavedLinkName>{link.name}</SavedLinkName>
        </SavedLink>
    })

    return (
        <MercerContainer>
            <Main>

            <Header>Mercer Dashboard</Header>

            <SectionHeader>Catalogs</SectionHeader>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "catalogMacon" ? "" : "catalogMacon")} $expand={expand === "catalogMacon" ? true : false}>
                        <SubHeaderText>Macon Campus</SubHeaderText>
                        {expand === "catalogMacon" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "catalogMacon" ? "accordion" : ""}>
                        <Link><LinkText href="https://documents.mercer.edu/catalogs/MaconCatalog/" target="_blank"><ArrowForwardIosIcon />2023-2024 Catalog- HTML Version</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                        <Link><LinkText href="https://registrar.mercer.edu/www/mu-registrar/macon/upload/MaconCatalog23_24_02262024.pdf" target="_blank"><ArrowForwardIosIcon />2023-2024 Catalog - Download PDF</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "catalogAtlanta" ? "" : "catalogAtlanta")} $expand={expand === "catalogAtlanta" ? true : false}>
                        <SubHeaderText>Atlanta Campus</SubHeaderText>
                        {expand === "catalogAtlanta" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "catalogAtlanta" ? "accordion" : ""}>
                         <Link><LinkText href="https://documents.mercer.edu/catalogs/AtlantaCatalog/" target="_blank" ><ArrowForwardIosIcon /> 2023-2024 Catalog - HTML Version</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText href="https://registrar.mercer.edu/www/mu-registrar/atlanta/upload/AtlantaCatalog23_24-02262024.pdf" target="_blank" ><ArrowForwardIosIcon /> 2023-2024 Catalog - Download PDF</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "catalogRegional" ? "" : "catalogRegional")} $expand={expand === "catalogRegional" ? true : false}>
                        <SubHeaderText>Regional Academic Center</SubHeaderText>
                        {expand === "catalogRegional" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "catalogRegional" ? "accordion" : ""}>
                         <Link><LinkText href="https://documents.mercer.edu/catalogs/RACCatalog/" target="_blank" ><ArrowForwardIosIcon /> 2023-2024 Catalog - HTML Version</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText href="https://registrar.mercer.edu/www/mu-registrar/regional-academic-centers/upload/RAC_Catalog23_24-02262024.pdf" target="_blank" ><ArrowForwardIosIcon /> 2023-2024 Catalog - Download PDF</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>



                <SectionHeader>Student Resources</SectionHeader>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "technology" ? "" : "technology")} $expand={expand === "technology" ? true : false}>
                        <SubHeaderText>Technology Checklist</SubHeaderText>
                        {expand === "technology" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "technology" ? "accordion" : ""}>
                         <Link><LinkText><ArrowForwardIosIcon /> Canvas</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Class Schedules and Academic Calendars</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Handshake</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Mercer Directory</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> My Mercer Portal</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Student Email Login</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Student Email Instructions</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Student Hardware and Software Discounts</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Student Technology Support - IT Help Desk</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Student Technology Tutorials</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Student Turnitin.com Tutorials</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "writing" ? "" : "writing")} $expand={expand === "writing" ? true : false}>
                        <SubHeaderText>Writing</SubHeaderText>
                        {expand === "writing" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "writing" ? "accordion" : ""}>
                         <Link><LinkText><ArrowForwardIosIcon /> Academic Resource Center</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> College Study Skills</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Online Writing Lab {'(OWL)'}</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Purdue Online Writing Lab</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "research" ? "" : "research")} $expand={expand === "research" ? true : false}>
                        <SubHeaderText>Research</SubHeaderText>
                        {expand === "research" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "research" ? "accordion" : ""}>
                         <Link><LinkText><ArrowForwardIosIcon /> GALILEO Tutorials</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Web Search Strategies {'(Video)'}</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "apa" ? "" : "apa")} $expand={expand === "apa" ? true : false}>
                        <SubHeaderText>APA</SubHeaderText>
                        {expand === "apa" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "apa" ? "accordion" : ""}>
                         <Link><LinkText><ArrowForwardIosIcon /> APA Publication Manual</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "math" ? "" : "math")} $expand={expand === "math" ? true : false}>
                        <SubHeaderText>Math</SubHeaderText>
                        {expand === "math" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "math" ? "accordion" : ""}>
                         <Link><LinkText><ArrowForwardIosIcon /> Academic Resource Center Math Links</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> Virtual Math Lab</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader onClick={() => setExpand((prev) => prev === "studying" ? "" : "studying")} $expand={expand === "studying" ? true : false}>
                        <SubHeaderText>Studying and Test Preparation</SubHeaderText>
                        {expand === "studying" ? <RemoveIcon />: <AddIcon />}
                    </SubHeader>
                    <LinkContainer className={expand === "studying" ? "accordion" : ""}>
                         <Link><LinkText><ArrowForwardIosIcon /> Academic Resource Center</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                         <Link><LinkText><ArrowForwardIosIcon /> College Study Skills</LinkText><SaveLink onClick={handleLinkClick}>Save Link</SaveLink></Link>
                    </LinkContainer>
                </Section>



                
            </Main>
            <Sidebar>
                <SidebarHeader>Useful Links</SidebarHeader>
                <SidebarLink>MyMercer</SidebarLink>
                <SidebarLink>Canvas</SidebarLink>
                <SidebarLink>Microsoft Outlook</SidebarLink>
                <SidebarHeader>Saved Links</SidebarHeader>
                {mappedSavedLinks}
            </Sidebar>
        </MercerContainer>
    )
}

const MercerContainer = styled.div`
    display: grid;
    grid-template-columns: 3.5fr 1fr;
    gap: 20px;
`

const Main = styled.div`
    padding: 20px;
`

const Header = styled.p`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`

const SectionHeader = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid var(--primary-orange);
    margin-bottom: 20px;
    margin-top: 60px;
`

const Section = styled(PrimaryContainer)`
    padding: 0px;
    margin-bottom: 20px;
`

const SubHeader = styled.div<({$expand: boolean})>`
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 20px;
    display: flex;
    border-radius: 15px;
    align-items: center;
    &:hover {
        cursor: pointer;
        background-color: var(--primary-orange);
        color: white;
    }
    ${(props) => props.$expand && `
        &+ section {
            display: block;
        }
    `}
`

const SubHeaderText = styled.p`

`

const LinkContainer = styled.section`
    display: none;
    margin-left: 40px;
    margin-top: 10px;
    padding-bottom: 20px;
`

const Link = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 1.2rem;
    height: 30px;
    cursor: pointer;
    &:hover {
        button {
            display: block;
        }
    }
    svg {
        height: 15px;
        width: 15px;
        color: var(--primary-orange);
    }
    margin-bottom: 5px;
`

const LinkText = styled.a`
    color: black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`

const SaveLink = styled(MainButton)`
    margin-right: 20px;
    display: none;
`

const Sidebar = styled(PrimaryContainer)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`

const SidebarHeader = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 10px;
`

const SidebarLink = styled.a`
    display: block;
    background-color: var(--primary-color);
    box-shadow: 1px 2px 1px 1px rgba(220,220,220,.5);
    border-radius: 15px;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
        background-color: var(--primary-orange);
        color: white;
        cursor: pointer;
    }
`

const SavedLink = styled(PrimaryContainer)`
    margin-bottom: 10px;
    &:hover {
        background-color: var(--primary-orange);
        color: white;
        cursor: pointer;
        button {
            visibility: visible;
            background-color: var(--primary-orange);
            color: white;
            border: 1px solid var(--primary-orange);
        }
    }
    button {
        &: hover {
            svg {
                border: 1px solid black;
            }
        }
    }
`

const SavedLinkTitle = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LinkTitleSpan = styled.span`

`

const SavedLinkName = styled.p`
`




