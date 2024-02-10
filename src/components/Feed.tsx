import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { PrimaryContainer } from '../components-styled/Containers';

const FeedContainer = styled(PrimaryContainer)`
    grid-area: feed;
`

export default function Feed(props) {

    return (
        <FeedContainer>
            Feed
        </FeedContainer>
    )
}