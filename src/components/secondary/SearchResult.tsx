import styled from "styled-components";
import Person2Icon from '@mui/icons-material/Person2';

export default function SearchResult(props: {name: string, email: string, handleSelectSearchItem: Function, setFocused: Function}) {

    return (
        <SearchResultContainer onMouseDown={() => props.handleSelectSearchItem(props.email)}>
            <SearchResultImg>
                <Person2Icon />
            </SearchResultImg>
            <SearchResultName>{props.name}</SearchResultName>
        </SearchResultContainer>
    )
}

const SearchResultContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: var(--secondary-color);
    }
`

const SearchResultImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`

const SearchResultName = styled.p`
    font-size: 1.2rem;
`