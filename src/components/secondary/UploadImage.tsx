import { useEffect, useRef, useState } from "react";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers"
import ProfilePic from "./ProfilePic"
import styled from "styled-components";
import { ExitButton, MainButton, SecondaryButton } from "../main-styles/Inputs";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { updateGlobalUser } from "../../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

export default function UploadImage(props: {url: String, email: String, preview: string, setShowEditProfilePicModal: Function}) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const uploadImage = useRef(null);
    const [selectUploadImage, setSelectUploadImage] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [file, setFile] = useState(null);
    const [sendImageForUpload, setSendImageForUpload] = useState(false);

    useEffect(() => {
        if (selectUploadImage && uploadImage.current) {
            uploadImage.current.click();
            setSelectUploadImage(false);
        }
    }, [selectUploadImage])

    useEffect(() => {
        try {
            if (sendImageForUpload && fileUrl) {
                async function updateUserProfileImage() {
                    const url = props.url + "/profile-image-uploaded";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({
                            email: props.email,
                            url: fileUrl
                        })
                    }).then((res) => res.json())
                    .then((res) => {
                        dispatch(updateGlobalUser(res.user))
                    }).then(() => {
                        navigate("/profile");
                        props.setShowEditProfilePicModal(false);
                        setSendImageForUpload(false);
                    })
                    .catch((err) => console.log(err));
                }
                updateUserProfileImage();
            }
        } catch(err) {
            console.log(err);
        }
    }, [fileUrl])

    async function handleSubmitImage() {
        if (file) {
            const url = props.url + "/update-profile-image";
            let formData = new FormData();
            formData.append("file", file.data);
    
            await fetch(url, {
                method: "POST",
                credentials: "include",
                body: formData
            }).then((res) => res.json())
            .then((res) => {
                setFileUrl(res.url)
                setSendImageForUpload(true);
            });
        }
    }

    function handleFileChange(e: any) {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setFile(img);
    }

    return (
        <OpacityBackground>
                <UploadImageModalContainer>
                    <ProfilePic height={"150px"} width={"150px"} profile_img_link={file ? file.preview : props.preview}/>
                    <ButtonContainer>
                        <ExitButton onClick={() => props.setShowEditProfilePicModal(false)}><CloseIcon /></ExitButton>
                        <UploadButtons onSubmit={handleSubmitImage}>
                            <UploadImageButton onClick={() => setSelectUploadImage(true)}>Upload Image</UploadImageButton>
                            <input ref={uploadImage} onChange={handleFileChange} style={{display: "none"}} type="file" name="file"/>
                            <SubmitImageButton onClick={handleSubmitImage}>Submit</SubmitImageButton>
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