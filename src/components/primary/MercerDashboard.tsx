import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function MercerDashboard(props: {url: String}) {



    return (
        <MercerContainer>
            <Main>
                <Header>Mercer Dashboard</Header>
                <SectionHeader>Student Resources</SectionHeader>
                <Section>
                    <SubHeader>Technology Checklist</SubHeader>
                    <LinkContainer>
                        <Link><ArrowForwardIosIcon /> Canvas</Link>
                        <Link><ArrowForwardIosIcon /> Class Schedules and Academic Calendars</Link>
                        <Link><ArrowForwardIosIcon /> Handshake</Link>
                        <Link><ArrowForwardIosIcon /> Mercer Directory</Link>
                        <Link><ArrowForwardIosIcon /> My Mercer Portal</Link>
                        <Link><ArrowForwardIosIcon /> Student Email Login</Link>
                        <Link><ArrowForwardIosIcon /> Student Email Instructions</Link>
                        <Link><ArrowForwardIosIcon /> Student Hardware and Software Discounts</Link>
                        <Link><ArrowForwardIosIcon /> Student Technology Support - IT Help Desk</Link>
                        <Link><ArrowForwardIosIcon /> Student Technology Tutorials</Link>
                        <Link><ArrowForwardIosIcon /> Student Turnitin.com Tutorials</Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader>Writing</SubHeader>
                    <LinkContainer>
                        <Link><ArrowForwardIosIcon /> Academic Resource Center</Link>
                        <Link><ArrowForwardIosIcon /> College Study Skills</Link>
                        <Link><ArrowForwardIosIcon /> Online Writing Lab {'(OWL)'}</Link>
                        <Link><ArrowForwardIosIcon /> Purdue Online Writing Lab</Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader>Research</SubHeader>
                    <LinkContainer>
                        <Link><ArrowForwardIosIcon /> GALILEO Tutorials</Link>
                        <Link><ArrowForwardIosIcon /> Web Search Strategies {'(Video)'}</Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader>APA</SubHeader>
                    <LinkContainer>
                        <Link><ArrowForwardIosIcon /> APA Publication Manual</Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader>Math</SubHeader>
                    <LinkContainer>
                        <Link><ArrowForwardIosIcon /> Academic Resource Center Math Links</Link>
                        <Link><ArrowForwardIosIcon /> Virtual Math Lab</Link>
                    </LinkContainer>
                </Section>
                <Section>
                    <SubHeader>Studying and Test Preparation</SubHeader>
                    <LinkContainer>
                        <Link><ArrowForwardIosIcon /> Academic Resource Center</Link>
                        <Link><ArrowForwardIosIcon /> College Study Skills</Link>
                    </LinkContainer>
                </Section>
            </Main>
            <Sidebar>
                <SidebarHeader>Other Links</SidebarHeader>
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

const Section = styled(PrimaryContainer)`
    margin-bottom: 20px;
`

const SectionHeader = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid var(--primary-orange);
    margin-bottom: 20px;
`

const SubHeader = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
    margin-left: 20px;
    display: flex;
    align-items: center;
`

const Sidebar = styled(PrimaryContainer)`
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`

const SidebarHeader = styled.p`

`

const LinkContainer = styled.div`
    margin-left: 40px;
    margin-top: 10px;
`

const Link = styled.p`
    font-size: 1.2rem;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    svg {
        height: 15px;
        width: 15px;
        color: var(--primary-orange);
    }
    margin-bottom: 5px;
`




