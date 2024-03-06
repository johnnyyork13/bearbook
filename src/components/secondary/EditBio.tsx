import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { EditHeader } from "../main-styles/Text";
import { ExitButton, MainButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { BioInterface } from "../../lib/interfaces";

export default function EditBio(props: {
    setUpdateBio: Function,
    setShowEditBio: Function, 
    setBio: Function
}) {

    const [bio, setBio] = useState("");

    function handleBioChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setBio(e.target.value);
    }

    function handleSubmitBio() {
        props.setBio((prev: BioInterface) => ({
            ...prev,
            bio: bio,
        }))
        props.setUpdateBio(true);
        props.setShowEditBio(false);
    }

    return (
        <OpacityBackground>
            <BioContainer>
                <BioHeaderContainer>
                    <EditHeader>Edit Bio</EditHeader>
                    <ExitButton onClick={() => props.setShowEditBio(false)}><CloseIcon /></ExitButton>
                </BioHeaderContainer>
                <EditInput onChange={handleBioChange} name="bio" placeholder="Tell everyone about yourself." />
                <MainButton onClick={handleSubmitBio}>Update</MainButton>
            </BioContainer>
        </OpacityBackground>
    )
}

const BioContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
`

const BioHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const EditInput = styled.textarea`
    height: 200px;
    min-width: 300px;
    resize: none;
    margin-bottom: 20px;
    font-family: "Titillium Web";
    font-size: 1.2rem;
    padding-left: 10px;
    padding-right: 10px;
`