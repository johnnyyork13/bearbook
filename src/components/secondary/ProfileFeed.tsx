import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";

export default function ProfileFeed() {

    return (
        <ProfileFeedContainer>
            Feed
        </ProfileFeedContainer>
    )   
}

const ProfileFeedContainer = styled(PrimaryContainer)`
    margin-right: 150px;
    width: 50%;
`