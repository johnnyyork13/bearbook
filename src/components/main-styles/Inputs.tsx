import styled from "styled-components";

const Button = styled.button`
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 7px;
    padding: 15px;
    padding-top: 5px;
    padding-bottom: 5px;
`

export const MainButton = styled(Button)`
    background-color: var(--primary-orange);
`

export const SecondaryButton = styled(Button)`
    background-color: var(--primary-black);
`
export const EditButton = styled(Button)`
    background-color: var(--secondary-black);
    color: white;
`

export const MainInput = styled.input`
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
    border: 1px solid var(--border-color);
    font-family: "Titillium Web";
`

export const ExitButton = styled.button`
    color: var(--primary-blue);
    border: none;
    background-color: var(--primary-color);
`

export const Error = styled.p`
    color: #ed4337;
    margin-bottom: 5px;
    font-weight: bold;
`