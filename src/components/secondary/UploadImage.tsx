import { useEffect, useRef, useState } from "react";
import { OpacityBackground, PrimaryContainer } from "../main-styles/Containers"
import ProfilePic from "./ProfilePic"
import styled from "styled-components";
import { MainButton, SecondaryButton } from "../main-styles/Inputs";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { updateGlobalUser } from "../../state/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function UploadImage(props: {url: String, email: String}) {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const uploadImage = useRef(null);
    const [selectUploadImage, setSelectUploadImage] = useState(false);
    const [fileUrl, setFileUrl] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (selectUploadImage && uploadImage.current) {
            uploadImage.current.click();
            setSelectUploadImage(false);
        }
    }, [selectUploadImage])

    useEffect(() => {
        try {
            if (fileUrl) {
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
                        navigate("/profile");
                    }).catch((err) => console.log(err));
                }
                updateUserProfileImage();
            }
        } catch(err) {
            console.log(err);
        }
    }, [fileUrl])

    async function handleSubmitImage(e) {
        e.preventDefault();
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
        });
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
                    <ProfilePic height={"150px"} width={"150px"} profile_img_link=""/>
                    <UploadImageButton onClick={() => setSelectUploadImage(true)}>Upload Image</UploadImageButton>
                    <form onSubmit={handleSubmitImage}>
                        <input ref={uploadImage} onChange={handleFileChange} style={{display: "none"}} type="file" name="file"/>
                        <SubmitImageButton type="submit">Submit</SubmitImageButton>
                    </form>
                </UploadImageModalContainer>
                </OpacityBackground>
    )
}

const UploadImageModalContainer = styled(PrimaryContainer)`
    
`

const UploadImageButton = styled(MainButton)`

`

const SubmitImageButton = styled(SecondaryButton)`

`