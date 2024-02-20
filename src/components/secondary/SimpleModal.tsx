import styled from "styled-components"
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers"
import { MainButton } from "../main-styles/Inputs"

export default function SimpleModal(props: {mainText: String, buttonText: String, buttonFunc: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <OpacityBackground>
            <Modal>
                <ModalMainText>{props.mainText}</ModalMainText>
                <ModalButton onClick={props.buttonFunc}>{props.buttonText}</ModalButton>
            </Modal>
        </OpacityBackground>
    )
}

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

const ModalButton = styled(MainButton)`

`