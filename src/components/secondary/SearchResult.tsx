import styled from "styled-components";
import ProfilePic from "./ProfilePic";

export default function SearchResult(props: {name: string, email: string, handleSelectSearchItem: Function, setFocused: Function, profile_img_link: string}) {

    return (
        <SearchResultContainer onMouseDown={() => props.handleSelectSearchItem(props.email)}>
            <ProfilePic height="40px" width="40px" profile_img_link={props.profile_img_link} />
            <SearchResultName>{props.name}</SearchResultName>
        </SearchResultContainer>
    )
}

const SearchResultContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    border-radius: 10px;
    &:hover {
        background-color: var(--hover-background);
    }
`

const SearchResultName = styled.p`
    font-size: 1.2rem;
    margin-left: 10px;
`