import styled from "styled-components";
import Person2Icon from '@mui/icons-material/Person2';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function ProfilePic(props: {height: string, width: string, hasEdit: Boolean, profile_img_link: string}) {

    return (
        <ProfilePicContainer $width={props.width} $height={props.height} $img={props.profile_img_link}>
            <Person2Icon />
            {props.hasEdit && 
                <ProfilePicEditButton>
                    <CameraAltIcon />
                </ProfilePicEditButton>
            }
        </ProfilePicContainer>
    )
}

const ProfilePicContainer = styled.div<{$width: string, $height: string, $img: string}>`
    ${props => props.$img &&
        `background-image: ${props.$img};`}
    width: ${props => props.$width};
    height: ${props => props.$height};
    position: relative;
    background-color: var(--secondary-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 40%;
        height: 40%;
    }
    z-index: 0;
`

const ProfilePicEditButton = styled.div`
    height: 35px;
    width: 35px;
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: var(--border-color);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 25px;
        height: 25px;
    }
`