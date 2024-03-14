import styled from "styled-components"
import {useEffect, useState} from 'react';
import { PrimaryContainer } from "../main-styles/Containers"
import { EditButton } from "../main-styles/Inputs";
import { useSelector} from "react-redux";
import { RootState} from '../../state/store';
import EditAddress from "./EditAddress";
import EditBio from "./EditBio";
import EditMajor from "./EditMajor";
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import BadgeIcon from '@mui/icons-material/Badge';
import { UserState } from "../../state/user/userSlice";

export default function Bio(props: {url: String, profileData: UserState}) {

    const globalUser = useSelector((state: RootState) => state.user);
    const [bio, setBio] = useState({
        bio: "",
        address: {
            address1: "",
            address2: "",
            city: "",
            state: "",
        },
        major: "",
    })
    const [showEditAddress, setShowEditAddress] = useState(false);
    const [showEditBio, setShowEditBio] = useState(false);
    const [showEditMajor, setShowEditMajor] = useState(false);
    const [updateBio, setUpdateBio] = useState(false);

    useEffect(() => {
        try {
            if (props.profileData.email !== "") {
                async function getUserBio() {
                    const url = props.url + "/get-bio";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({email: props.profileData.email})
                    }).then((res) => res.json())
                    .then((res) => {
                        setBio(res);
                    }).catch((err) => console.log(err));
                }
                getUserBio();
            }
        } catch(err) {
            console.log(err);
        }
    }, [props.profileData])

    useEffect(() => {
        try {
            if (updateBio) {
                async function updateUserBio() {
                    const url = props.url + '/update-bio';
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({email: globalUser.email, bio: bio})
                    }).then((res) => res.json())
                    .then((res) => {
                        setBio(res)
                        setUpdateBio(false);
                    })
                    .catch((err) => console.log(err));
                }
                updateUserBio();
            }
        } catch(err) {
            console.log(err);
        }
    }, [updateBio])

    return (
        <BioContainer>
            <BioSection>
                <BioSectionHeader>Intro</BioSectionHeader>
                {bio.address.city && bio.address.state ? 
                    <BioTextContainer>
                        <HomeIcon /> 
                        <BioText>Lives in <BioTextBold>{bio.address.city}, {bio.address.state}</BioTextBold></BioText>
                    </BioTextContainer> :
                    
                    globalUser.email === props.profileData.email ? 
                        <BioButton onClick={() => setShowEditAddress(true)}>Add Address</BioButton> :
                        <BioTextContainer>
                            <HomeIcon /> 
                            <BioText>No address to show.</BioText>
                        </BioTextContainer>
                }
                {bio.major ?
                    <BioTextContainer>
                        <SchoolIcon /> 
                        <BioText>Studying <BioTextBold>{bio.major}</BioTextBold></BioText>
                    </BioTextContainer> :
                    
                    globalUser.email === props.profileData.email ? 
                        <BioButton onClick={() => setShowEditMajor(true)}>Add Major</BioButton> :
                        <BioTextContainer>
                            <SchoolIcon /> 
                            <BioText>No major to show.</BioText>
                        </BioTextContainer>
                }
                <BioTextContainer>
                    <BadgeIcon />
                    <BioText><BioTextBold>{props.profileData.role.length > 0 && props.profileData.role[0].toUpperCase() + props.profileData.role.slice(1)}</BioTextBold> at Mercer University</BioText>
                </BioTextContainer>
            </BioSection>
                <BioSection>
                    <BioSectionHeader>About Me</BioSectionHeader>
                {bio.bio ? 
                    <BioTextContainer>{bio.bio}</BioTextContainer> :
                    globalUser.email === props.profileData.email ? 
                        <BioButton onClick={() => setShowEditBio(true)}>Add Bio</BioButton>:
                        <BioText>No bio to show.</BioText>
                    }
                </BioSection>
             
            
             {showEditAddress && <EditAddress setUpdateBio={setUpdateBio} setShowEditAddress={() => setShowEditAddress(false)} setBio={setBio}/>}
             {showEditBio && <EditBio setUpdateBio={setUpdateBio} setShowEditBio={() => setShowEditBio(false)} setBio={setBio}/>}
             {showEditMajor && <EditMajor setUpdateBio={setUpdateBio} setShowEditMajor={() => setShowEditMajor(false)} setBio={setBio}/>}
        </BioContainer>
    )
}

const BioContainer = styled(PrimaryContainer)`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
`

const BioButton = styled(EditButton)`
    margin-bottom: 15px;
    height: 40px;
`

const BioSection = styled.div`
    margin-bottom: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`

const BioSectionHeader = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
`

const BioTextContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const BioText = styled.p`
    font-size: 1.1rem;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`

const BioTextBold = styled.span`
    font-weight: bolder;
`