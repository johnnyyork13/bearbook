import { useEffect, useRef, useState } from "react";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers"
import ProfilePic from "./ProfilePic"
import styled from "styled-components";
import { ExitButton, MainButton, SecondaryButton } from "../main-styles/Inputs";
import CloseIcon from '@mui/icons-material/Close';
import { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";
import { setGlobalUser } from "../../state/user/userSlice";

export default function UploadImage(props: {url: String, email: String, profile_img_link: string, setShowEditProfilePicModal: Function}) {

    const dispatch = useDispatch<AppDispatch>();
    const uploadImage = useRef<null | HTMLInputElement>(null);
    const [selectUploadImage, setSelectUploadImage] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [sendImageForUpload, setSendImageForUpload] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileUrl(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if (selectUploadImage && uploadImage.current) {
            uploadImage.current.click();
            setSelectUploadImage(false);
        }
    }, [selectUploadImage])

    useEffect(() => {
        if (sendImageForUpload) {
            try {
                async function uploadImage() {
                    const url = props.url + "/upload-profile-image";
                    await fetch(url, {
                        method: "POST",
                        mode: "cors",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: props.email,
                            image: fileUrl,
                        })
                    }).then((res) => res.json())
                    .then((res) => {
                        dispatch(setGlobalUser(res.user));
                        props.setShowEditProfilePicModal(false);
                    })
                }
                uploadImage();
            } catch(err) {  
                console.log(err);
            }
        }
    })

    return (
        <OpacityBackground>
                <UploadImageModalContainer>
                    <ProfilePic height={"150px"} width={"150px"} profile_img_link={fileUrl ? fileUrl : props.profile_img_link}/>
                    <ButtonContainer>
                        <ExitButton onClick={() => props.setShowEditProfilePicModal(false)}><CloseIcon /></ExitButton>
                        <UploadButtons>
                            <UploadImageButton onClick={() => setSelectUploadImage(true)}>Choose Image</UploadImageButton>
                            <input ref={uploadImage} onChange={handleFileChange} style={{display: "none"}} type="file" name="file"/>
                            <SubmitImageButton onClick={() => setSendImageForUpload(true)}>Upload</SubmitImageButton>
                        </UploadButtons>
                    </ButtonContainer>
                </UploadImageModalContainer>
                </OpacityBackground>
    )
}

const UploadImageModalContainer = styled(PrimaryContainer)`
    padding: 30px;
    display: flex;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
`

const UploadImageButton = styled(MainButton)`

`

const SubmitImageButton = styled(SecondaryButton)`

`

const UploadButtons = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
        height: calc(100% - 20px);
        button {
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
        }
`