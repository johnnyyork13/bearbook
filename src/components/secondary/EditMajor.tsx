import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { ExitButton, MainButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import { EditHeader } from "../main-styles/Text";
import { useState } from "react";
import { BioInterface } from "../../lib/interfaces";

export default function EditMajor(props: {
    setUpdateBio: Function,
    setShowEditMajor: Function, 
    setBio: Function  
}) {

    const [major, setMajor] = useState("");

    function handleMajorChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMajor(e.target.value);
    }

    function handleMajorSubmit() {
        props.setBio((prev: BioInterface) => ({
            ...prev,
            major: major,
        }))
        props.setUpdateBio(true);
        props.setShowEditMajor(false);
    }

    return (
        <OpacityBackground>
            <EditMajorContainer>
                <EditMajorHeaderContainer>
                    <EditMajorHeader>Edit Major</EditMajorHeader>
                    <ExitButton onClick={() => props.setShowEditMajor(false)}><CloseIcon /></ExitButton>
                </EditMajorHeaderContainer>
                <EditInput onChange={handleMajorChange} name="major" placeholder="What are you currently studying?"/>
                <MainButton onClick={handleMajorSubmit}>Update</MainButton>
            </EditMajorContainer>
        </OpacityBackground>
    )
}

const EditMajorContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    min-width: 250px;
`

const EditMajorHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const EditMajorHeader = styled(EditHeader)`
    
`

const EditInput = styled(MainInput)`
    height: 30px;
    margin-bottom: 20px;
`
