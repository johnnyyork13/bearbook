import styled from 'styled-components';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { setGlobalUser } from "../../state/user/userSlice";
import {NavLink, useNavigate} from "react-router-dom"

import Signup from './Signup';
import { PrimaryContainer } from "../main-styles/Containers";
import { MainInput, Error, GreenButton, BlueButton } from '../main-styles/Inputs';
import { Logo } from '../main-styles/Logo';

export default function Login(props: {url: string}) {
    const navigate = useNavigate();
    // const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const [sendUser, setSendUser] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        try {
            async function checkIfAlreadyLoggedIn(){
                const url = props.url + "/login";
                await fetch(url, {
                    credentials: "include",
                }).then((res) => res.json())
                .then((res) => {
                    if (!res.message) {
                        dispatch(setGlobalUser(res));
                        navigate("/home");
                    }
                }).catch((err) => console.log(err));
            }
            checkIfAlreadyLoggedIn();
        } catch(err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        try {
            if (sendUser) {
                async function loginUser() {
                    const url = props.url + "/login";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(user),
                    }).then((res) => res.json())
                    .then((res) => {
                        if (!res.message) {
                            dispatch(setGlobalUser(res));
                            navigate("/home");
                        } else {
                            setError(true);
                        }
                        setSendUser(false);
                    }).catch((err) => {
                        console.log(err);
                        setSendUser(false);
                    });
                }
                loginUser();
            }
        } catch(err) {  
            setSendUser(false);
            console.log(err);
        }
    }, [sendUser])

    return (
        <MainContainer>
            <HistoryLogo>MyFace</HistoryLogo>
            <FormContainer>
                <LoginForm onSubmit={(e) => e.preventDefault()}>
                    {error && <Error>Please enter a valid email and password.</Error>}
                    <Input name="email" onChange={handleInputChange} placeholder="Email"/>
                    <Input name="password" type="password" onChange={handleInputChange} placeholder="Password"/>
                    <LoginButton onClick={() => setSendUser(true)}>Login</LoginButton>
                    <ForgotPassword>Forgot password?</ForgotPassword>
                </LoginForm>
                <LineBreak></LineBreak>
                <SignupButton onClick={() => setOpenSignup(true)}>Create new account</SignupButton>
            </FormContainer>
            {openSignup && <Signup url={props.url} setOpenSignup={setOpenSignup}/>}
        </MainContainer>
    )
}

const MainContainer = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const HistoryLogo = styled(Logo)`
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: bolder;
`

const FormContainer = styled(PrimaryContainer)`
    padding: 20px;
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled(MainInput)`
    height: 40px;
    margin-bottom: 10px;
`

const LoginButton = styled(BlueButton)`
    font-size: 1.4rem;
`

const ForgotPassword = styled.p`
    text-align: center;
    margin: 10px;
    color: var(--primary-blue);
`

const LineBreak = styled.hr`
    border: 1px solid var(--secondary-color);
    margin-top: 20px;
    margin-bottom: 20px;
`

const SignupButton = styled(GreenButton)`
    margin-left: 50px;
    margin-right: 50px;
    font-size: 1.2rem;
`