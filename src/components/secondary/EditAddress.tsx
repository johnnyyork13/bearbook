import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { ExitButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';

export default function EditAddress(props: {setShowEditAddress: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <OpacityBackground>
            <EditAddressContainer>
                <ExitButton onClick={props.setShowEditAddress}><CloseIcon /></ExitButton>
                <MainInput />
            </EditAddressContainer>
        </OpacityBackground>
    )
}

const EditAddressContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
`