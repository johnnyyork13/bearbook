import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { SecondaryContainer } from '../main-styles/Containers';

export default function Contacts(props) {

    return (
        <ContactsContainer>
            Contacts
        </ContactsContainer>
    )
}

const ContactsContainer = styled(SecondaryContainer)`
    background-color: var(--secondary-color);
`