import styled from "styled-components";
import { PrimaryContainer } from "../main-styles/Containers";
import { BlueButton } from "../main-styles/Inputs";
import { EditHeader } from "../main-styles/Text";
import { useEffect, useState } from "react";

export default function ProfileFeed() {

    const [test, setTest] = useState(false);

    // useEffect(() => {
    //     if (test) {
    //         async function sendRequest() {
    //             const url = `https://query.wikidata.org/sparql?query=${testQuery}&format=json`;
    //             await fetch(url).then((res) => res.json()).then((res) => console.log(res));
    //         }
    //         sendRequest();
    //     }
    // }, [test])

    return (
        <ProfileFeedContainer>
            <BlueButton  onClick={() => setTest((prev) => !prev)}>Test</BlueButton>
            <EditHeader></EditHeader>
        </ProfileFeedContainer>
    )   
}

const ProfileFeedContainer = styled(PrimaryContainer)`
    margin-right: 150px;
    width: 50%;
    margin-left: 20px;
`