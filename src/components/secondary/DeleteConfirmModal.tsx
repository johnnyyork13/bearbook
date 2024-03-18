import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { ExitButton, MainButton, SecondaryButton } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';

export default function DeleteConfirmModal(props: {mainText: String, buttonText: String, buttonFunc: React.MouseEventHandler<HTMLButtonElement>, closeFunc: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <OpacityBackground>
            <Modal>
                <ModalHeaderContainer>
                    <ModalMainText>{props.mainText}</ModalMainText>
                    <ExitButton onClick={props.closeFunc}><CloseIcon /></ExitButton>
                </ModalHeaderContainer>
                <Buttons>
                    <BackButton onClick={props.closeFunc}>Go Back</BackButton>
                    <ModalButton onClick={props.buttonFunc}>{props.buttonText}</ModalButton>
                </Buttons>
            </Modal>
        </OpacityBackground>
    )
}



const Modal = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ModalHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`

const ModalMainText = styled.p`
    text-align: center;
    font-size: 1.7rem;
    margin-right: 30px;
`

const Buttons = styled.div`
    display: flex;
    button {
        margin-right: 10px;
        margin-left: 10px;
    }
`

const BackButton = styled(SecondaryButton)`

`

const ModalButton = styled(MainButton)`

`