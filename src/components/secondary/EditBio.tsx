import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { EditHeader } from "../main-styles/Text";
import { BlueButton, ExitButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';

export default function EditBio(props: {setShowEditBio: React.MouseEventHandler<HTMLButtonElement>}) {


    return (
        <OpacityBackground>
            <BioContainer>
                <BioHeaderContainer>
                    <EditHeader>Edit Bio</EditHeader>
                    <ExitButton onClick={props.setShowEditBio}><CloseIcon /></ExitButton>
                </BioHeaderContainer>
                <EditInput placeholder="Tell us about yourself." />
                <BlueButton>Update</BlueButton>
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