import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { SecondaryContainer } from '../components-styled/Containers';

const ContactsContainer = styled(SecondaryContainer)`
    grid-area: contacts;
    background-color: var(--secondary-color);
`

export default function Contacts(props) {

    return (
        <ContactsContainer>
            Contacts
        </ContactsContainer>
    )
}