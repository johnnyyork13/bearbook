import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid';

export default function LoadSpinner() {

    const [dots, setDots] = useState(1);

    let visibleDots = [];

    for (let i = 0; i < dots; i++) {
        visibleDots.push(<span key={uuidv4()}>.</span>)
    }

    useEffect(() => {
        setTimeout(() => {
            if (dots === 5) {
                setDots(1);
            } else {
                setDots((prev) => prev + 1);
            }
        }, 500)
    }, [dots])
    return (
        <Background>
            <SpinnerContainer>
                <Text>Loading{visibleDots}</Text>
                <BallContainer>
                    <BallLeftContainer>
                        <BallLeft><BallGlare /></BallLeft>
                    </BallLeftContainer>
                    <Ball><BallGlare /></Ball>
                    <Ball><BallGlare /></Ball>
                    <Ball><BallGlare /></Ball>
                    <BallRightContainer>
                        <BallRight><BallGlare /></BallRight>
                    </BallRightContainer>
                </BallContainer>
            </SpinnerContainer>
        </Background>
    )
}

const Background = styled(OpacityBackground)`
    flex-direction: column;
`

const SpinnerContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Text = styled.p`
    font-weight: bolder;
    font-size: 1.7rem;
    color: var(--primary-orange);
    width: 40%;
`

const BallContainer = styled.div`
    width: 350px;
    height: 70px;
    display: grid;
    grid-template-columns: 100px repeat(3, 50px) 100px;
    grid-template-rows: 1fr;
    align-items: flex-end;
`

const MoveBallContainer = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: flex-end;
`

const Ball = styled.div`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: var(--primary-orange);
    border: 1px solid rgb(50,50,50);
    position: relative;
`

const BallGlare = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    height: 10px;
    width: 10px;
    border-radius: 5px;
`

const BallLeftContainer = styled(MoveBallContainer)`
    justify-content: flex-end;
    animation: 1.5s linear infinite moveBallLeft;
    @keyframes moveBallLeft {
        0% {
            transform: rotate(0deg) translateY(0px);
        }
        25% {
            transform: rotate(70deg) translateY(-80px) translateX(-100px);
        }
        50% {
            transform: rotate(0deg) translateY(0px);
        }

    }
`

const BallRightContainer = styled(MoveBallContainer)`
    animation: 1.5s linear infinite moveBallRight;
    animation-delay: 0.75s;
    @keyframes moveBallRight {
        0% {
            transform: rotate(0deg) translateY(0px);
        }
        25% {
            transform: rotate(-70deg) translateY(-80px) translateX(100px);
        }
        50% {
            transform: rotate(0deg) translateY(0px);
        }
    }
`

const BallLeft = styled(Ball)`
    position: relative;
    float: right;

`

const BallRight = styled(Ball)`

`