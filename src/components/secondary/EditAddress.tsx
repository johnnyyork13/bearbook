import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { ExitButton, MainButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import { EditHeader } from "../main-styles/Text";

export default function EditAddress(props: {setShowEditAddress: React.MouseEventHandler<HTMLButtonElement>}) {

    return (
        <OpacityBackground>
            <EditAddressContainer>
                <EditAddressHeaderContainer>
                    <EditAddressHeader>Edit Address</EditAddressHeader>
                    <ExitButton onClick={props.setShowEditAddress}><CloseIcon /></ExitButton>
                </EditAddressHeaderContainer>
                <EditInput placeholder="Address Line 1"/>
                <EditInput placeholder="Address Line 2"/>
                <EditInputContainer>
                    <EditInput placeholder="City" />
                    <EditInput placeholder="State" />
                </EditInputContainer>
                <MainButton>Update</MainButton>
            </EditAddressContainer>
        </OpacityBackground>
    )
}

const EditAddressContainer = styled(PrimaryContainer)`
    display: flex;
    flex-direction: column;
`

const EditAddressHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const EditAddressHeader = styled(EditHeader)`
    
`

const EditInput = styled(MainInput)`
    height: 30px;
    margin-bottom: 20px;
`

const EditInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    input {
        width: 43%;
    }
`