import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";


export default function Friends() {

    return (
        <FriendsContainer>
            Friends
        </FriendsContainer>
    )
}

const FriendsContainer = styled(PrimaryContainer)`
    grid-row: 2;
    min-height: 300px;
`