import {useEffect, useState} from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { PrimaryContainer } from "../main-styles/Containers";
import { GreenButton, MainInput, Error } from "../main-styles/Inputs";
import SimpleModal from "../secondary/SimpleModal";

export default function Signup(props: {url: string, setOpenSignup: Function}) {

    const [sendUser, setSendUser] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    })
    const [loginModalAttributes, setLoginModalAttributes] = useState({
        show: false,
        mainText: "Please login with credentials.",
        buttonText: "Go to Login",
        buttonFunc: () => props.setOpenSignup(false)
    });

    function  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleUserSubmit() {
        let allFieldsHaveValues = true;
        for (const key in user) {
            if (user[key as keyof typeof user] === "") {
                allFieldsHaveValues = false;
                setError((prev) => ({
                    ...prev,
                    [key]: true,
                }))
            } else {
                setError((prev) => ({
                    ...prev,
                    [key]: false,
                }))
            }
        }

        if (!validateEmail(user.email)) {
            setError((prev) => ({
                ...prev,
                email: true,
            }))
        }

        if (allFieldsHaveValues && user.password.length >= 8) { 
            setSendUser(true);
        } else {
            setError((prev) => ({
                ...prev,
                password: true,
            }))
        }
    }

    const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    useEffect(() => {
        try {
            if (sendUser) {
                console.log('sending user');
                async function addUser() {
                    const url = props.url + '/signup';
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(user),
                    }).then((res) => res.json())
                    .then((res) => {
                        setSendUser(false);
                        if (res.success) {
                            setLoginModalAttributes(() => ({
                                show: true,
                                mainText: "Please login with credentials.",
                                buttonText: "Go to Login",
                                buttonFunc: () => props.setOpenSignup(false)
                            }));
                        } else {
                            setLoginModalAttributes(() => ({
                                show: true,
                                mainText: "Email already exists!",
                                buttonText: "Back",
                                buttonFunc: () => setLoginModalAttributes((prev) => ({...prev, show: false}))
                            }))
                        }
                    }).catch((err) => console.log(err));
                }
                addUser();
            }
        } catch(err) {
            setSendUser(false);
            console.log(err);
        }
    }, [sendUser]);

    return (
        <SignupContainer>
            {loginModalAttributes.show && <SimpleModal 
                mainText={loginModalAttributes.mainText}
                buttonText={loginModalAttributes.buttonText}
                buttonFunc={loginModalAttributes.buttonFunc}
            />}
            <SignupForm onSubmit={(e) => e.preventDefault()}>
                <SignupHeaderContainer>
                    <SignupHeader>Sign Up for HistoryBook</SignupHeader>
                    <ExitButton onClick={() => props.setOpenSignup(false)}><CloseIcon /></ExitButton>
                </SignupHeaderContainer>
                <SignupSubheader>And speak to your favorite historical figure.</SignupSubheader>
                <Hr></Hr>
                {(error.firstName || error.lastName) && <Error>Please enter a valid name.</Error>}
                <div>
                    <Input name="firstName" placeholder="First Name" onChange={handleInputChange}/>
                    <Input name="lastName" placeholder="Last Name" onChange={handleInputChange}/> 
                </div>
                {error.email && <Error>Please enter a valid email.</Error>}
                <Input name="email" type="email" placeholder="Email" onChange={handleInputChange}/>
                {error.password && <Error>Please enter a valid password.</Error>}
                <Input name="password" type="password" placeholder="Password (minimum 8 characters)" onChange={handleInputChange}/>
                <SignupButton onClick={handleUserSubmit}>Sign Up</SignupButton>
            </SignupForm>
        </SignupContainer>
    )
}

const SignupContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const SignupForm = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
`


const SignupHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const ExitButton = styled.button`
    color: var(--primary-blue);
    border: none;
    background-color: var(--primary-color);
`

const SignupHeader = styled.p`
    font-weight: bold;
    font-size: 2rem;
    color: var(--primary-blue);
    margin-bottom: 10px;
`

const SignupSubheader = styled.p`
    font-size: 1.1rem;
    color: var(--primary-blue);
    margin-bottom: 5px;
`

const Hr = styled.hr`
    border: 1px solid var(--secondary-color);
    margin: 20px;
    width: 100%;
`

const Input = styled(MainInput)`
    height: 30px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: var(--input-background-grey);
`

const SignupButton = styled(GreenButton)`
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 20px;
`