import styled from "styled-components";
import Person2Icon from '@mui/icons-material/Person2';

export default function ProfilePic(props: {height: string, width: string, profile_img_link: string}) {

    return (
        <ProfilePicContainer $width={props.width} $height={props.height} $img={props.profile_img_link}>
            {!props.profile_img_link && <Person2Icon />}
        </ProfilePicContainer>
    )
}

const ProfilePicContainer = styled.div<{$width: string, $height: string, $img: string}>`
    ${props => props.$img &&
        `background-image: url(${props.$img});`}
    width: ${props => props.$width};
    height: ${props => props.$height};
    background-size: cover;
    position: relative;
    background-color: var(--profile-pic-background);
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