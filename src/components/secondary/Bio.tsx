import styled from "styled-components"
import {useEffect, useState} from 'react';
import { PrimaryContainer } from "../main-styles/Containers"
import { GreyButton } from "../main-styles/Inputs";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import EditAddress from "./EditAddress";

export default function Bio(props: {url: String}) {

    const [bio, setBio] = useState({
        bio: "",
        address: "",
    })
    const [showEditAddress, setShowEditAddress] = useState(false);

    useEffect(() => {
        try {
            async function getUserBio() {
                const url = props.url + "/bio";
                await fetch(url, {
                    credentials: "include",
                }).then((res) => res.json())
                .then((res) => {
                    setBio({
                        bio: res.bio,
                        address: `${res.city}, ${res.state}`,
                    })
                })
            }
            getUserBio();
        } catch(err) {
            console.log(err);
        }
    }, [])

    return (
        <BioContainer>
            <BioHeader>Intro</BioHeader>
             {bio.address ? 
                `Lives in ${<BioBoldText>{bio.address}</BioBoldText>}` : 
                <BioButton onClick={() => setShowEditAddress(true)}>Add Address</BioButton>
             }
             {bio.bio ? 
                `${<BioBoldText>{bio.bio}</BioBoldText>}` : 
                <BioButton>Add Bio</BioButton>
             }
             {showEditAddress && <EditAddress setShowEditAddress={() => setShowEditAddress(false)}/>}
        </BioContainer>
    )
}

const BioContainer = styled(PrimaryContainer)`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const BioHeader = styled.p`
    font-size: 1.4rem;
    font-weight: bolder;
    margin-bottom: 20px;
`

const BioButton = styled(GreyButton)`
    margin-bottom: 15px;
    height: 40px;
`

const BioBoldText = styled.p`

`