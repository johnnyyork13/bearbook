import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";

export default function PostPlaceholder() {

    return (
        <PostContainer>
            <PostHeader>
                <PostGradiantSmall></PostGradiantSmall>
            </PostHeader>
            <PostBody>
                <PostGradiantLarge></PostGradiantLarge>
            </PostBody>
        </PostContainer>
    )
}

const PostContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
`

const PostHeader = styled.div`
    margin-bottom: 15px;
    width: 100%;
    height: 40px;
    overflow: hidden;
`

const PostBody = styled.div`
    height: 100px;
    width: 100%;
    overflow: hidden;
`

const PostGradiant = styled.div`
    background-image: linear-gradient(to right, rgb(240, 240, 240), rgb(220, 220, 220));
    animation: placeHolderShimmer 2.5s linear infinite;
    @keyframes placeHolderShimmer{
        0%{
            transform: translateX(-100%);
        }
        100%{
            transform: translateX(100%);
        }
    }
`

const PostGradiantSmall = styled(PostGradiant)`
    width: 200%;
    height: 30px;
`

const PostGradiantLarge = styled(PostGradiant)`
    width: 200%;
    height: 100px;
`


