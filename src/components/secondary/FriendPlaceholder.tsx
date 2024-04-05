import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";

export default function FriendPlaceholder() {

    return (
        <FriendContainer>
            <FriendPic>
                <Gradient></Gradient>
            </FriendPic>
            <FriendButton>
                <Gradient></Gradient>
            </FriendButton>
        </FriendContainer>
    )
}

const FriendContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
`

const FriendPic = styled.div`
    border-radius: 50%;
    width: 70px;
    height: 70px;
    overflow: hidden;
`

const Gradient = styled.div`
    width: 200%;
    height: 100px;
    background-image: linear-gradient(to right, rgb(240, 240, 240), rgb(220, 220, 220));
    animation: placeHolderShimmer 1.8s linear infinite;
    @keyframes placeHolderShimmer{
        0%{
            transform: translateX(-100%);
        }
        100%{
            transform: translateX(100%);
        }
    }
`

const FriendButton = styled.div`
    width: 100px;
    height: 30px;
    margin-top: 10px;
    overflow: hidden;
`