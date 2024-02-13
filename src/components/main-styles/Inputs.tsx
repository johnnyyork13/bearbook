import styled from "styled-components";

const Button = styled.button`
    color: white;
    font-weight: bolder;
    font-size: 1.4rem;
    border: none;
    border-radius: 7px;
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`

export const BlueButton = styled(Button)`
    background-color: var(--primary-blue);
`

export const GreenButton = styled(Button)`
    background-color: var(--primary-green);
`

export const MainInput = styled.input`
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
`

export const Error = styled.p`
    color: #ed4337;
    margin-bottom: 5px;
    font-weight: bold;
`