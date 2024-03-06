import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { ExitButton, MainButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

export default function EditProfile(props: {url: String, profileData: any, setProfileData: Function, setShowEditProfile: Function}) {

    const [profileInformation, setProfileInformation] = useState({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        major: "",
        bio: "",
    })
    const [sendProfileUpdate, setSendProfileUpdate] = useState(false);

    useEffect(() => {
        if (props.profileData.email !== "") {
            async function getProfileInformation() {
                const url = props.url + "/get-edit-profile-information";
                await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: props.profileData.email})
                }).then((res) => res.json())
                .then((res) => {
                    setProfileInformation(res);
                }).catch((err) => console.log(err));
            }
            getProfileInformation();
        }
    }, [])

    useEffect(() => {
        if (sendProfileUpdate) {
            try {
                async function sendUpdatedProfileInformation() {
                    const url = props.url + "/update-profile-information";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: props.profileData.email,
                            ...profileInformation,
                        })
                    }).then((res) => res.json())
                    .then((res) => {
                        setSendProfileUpdate(false);
                        props.setShowEditProfile(false);
                        props.setProfileData(res.user);
                    }).catch((err) => console.log(err));
                }
                sendUpdatedProfileInformation();
            } catch(err) {
                console.log(err);
            }
        }
    }, [sendProfileUpdate])

    function handleProfileInformationChange(e: any) {
        setProfileInformation({...profileInformation, [e.target.name]: e.target.value});
    }

    return (
        <OpacityBackground>
            <EditProfileContainer>
                <EditProfileHeader>
                    <EditProfileHeaderText>Edit Profile</EditProfileHeaderText>
                    <ExitButton onClick={() => props.setShowEditProfile(false)}><CloseIcon /></ExitButton>
                </EditProfileHeader>
                <EditProfileForm>
                    <EditProfileLabel>First Name</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.firstName} name="firstName" type="text" placeholder="First Name" />
                    <EditProfileLabel>Last Name</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.lastName} name="lastName" type="text" placeholder="Last Name" />
                    <EditProfileLabel>Address 1</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.address1} name="address1" type="text" placeholder="Address1" />
                    <EditProfileLabel>Address 2</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.address2} name="address2" type="text" placeholder="Address2" />
                    <EditProfileLabel>City</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.city} name="city" type="text" placeholder="City" />
                    <EditProfileLabel>State</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.state} name="state" type="text" placeholder="State" />
                    <EditProfileLabel>Major</EditProfileLabel>
                    <EditProfileInput onChange={handleProfileInformationChange} value={profileInformation.major} name="major" type="text" placeholder="Major" />
                    <EditProfileLabel>Bio</EditProfileLabel>
                    <EditProfileTextArea onChange={handleProfileInformationChange} value={profileInformation.bio} name="bio" placeholder="Bio"></EditProfileTextArea>
                    <EditProfileButton onClick={() => setSendProfileUpdate(true)}>Update Profile</EditProfileButton>
                </EditProfileForm>
            </EditProfileContainer>
        </OpacityBackground>
    )
}

const EditProfileContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
`

const EditProfileHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
`

const EditProfileHeaderText = styled.p`
    font-size: 1.7rem;
    color: var(--primary-orange);
`

const EditProfileForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const EditProfileLabel = styled.label`
    width: 100%;
    margin-bottom: 5px;
    font-size: 1.1rem;
    font-weight: bold;
`

const EditProfileInput = styled(MainInput)`
    margin-bottom: 20px;
    height: 30px;
    width: 300px;
`

const EditProfileTextArea = styled.textarea`
    margin-bottom: 20px;
    height: 100px;
    width: 300px;
    box-sizing: border-box;
    resize: none;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid var(--border-color);
    font-family: "Titillium Web";
`

const EditProfileButton = styled(MainButton)`
    margin-top: 20px;
    height: 40px;
`