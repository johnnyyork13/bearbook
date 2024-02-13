import styled from "styled-components"
import { PrimaryContainer } from "../main-styles/Containers"
import { BlueButton } from "../main-styles/Inputs"

export default function SimpleModal(props: {mainText: String, buttonText: String, buttonFunc: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <ModalContainer>
            <Modal>
                <ModalMainText>{props.mainText}</ModalMainText>
                <ModalButton onClick={props.buttonFunc}>{props.buttonText}</ModalButton>
            </Modal>
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: background-color: rgba(255,255,255,.5);
`

const Modal = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ModalMainText = styled.p`
    text-align: center;
    font-size: 1.7rem;
    margin-bottom: 40px;
`

const ModalButton = styled(BlueButton)`

`