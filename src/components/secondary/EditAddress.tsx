import styled from "styled-components";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers";
import { ExitButton, MainButton, MainInput } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import { EditHeader } from "../main-styles/Text";
import { useState } from "react";
import { BioInterface } from "../../lib/interfaces";

export default function EditAddress(props: {
    setUpdateBio: Function,
    setShowEditAddress: Function, 
    setBio: Function  
}) {

    const [address, setAddress] = useState({
        address1: "",
        address2: "",
        city: "",
        state: "",
    })

    function handleAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
        setAddress((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handleAddressSubmit() {
        props.setBio((prev: BioInterface) => ({
            ...prev,
            address: address,
        }))
        props.setUpdateBio(true);
        props.setShowEditAddress(false);
    }

    return (
        <OpacityBackground>
            <EditAddressContainer>
                <EditAddressHeaderContainer>
                    <EditAddressHeader>Edit Address</EditAddressHeader>
                    <ExitButton onClick={() => props.setShowEditAddress(false)}><CloseIcon /></ExitButton>
                </EditAddressHeaderContainer>
                <EditInput onChange={handleAddressChange} name="address1" placeholder="Address Line 1"/>
                <EditInput onChange={handleAddressChange} name="address2" placeholder="Address Line 2"/>
                <EditInputContainer>
                    <EditInput  onChange={handleAddressChange} name="city"placeholder="City" />
                    <EditInput  onChange={handleAddressChange} name="state"placeholder="State" />
                </EditInputContainer>
                <MainButton onClick={handleAddressSubmit}>Update</MainButton>
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