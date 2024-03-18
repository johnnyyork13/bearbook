import styled from 'styled-components';

export const PrimaryContainer = styled.div`
    background-color: var(--primary-color);
    box-shadow: 1px 2px 1px 1px rgba(220,220,220,.5);
    border-radius: 15px;
    padding: 20px;
`

export const SecondaryContainer = styled.div`
    background-color: var(--secondary-color);
    padding: 20px;
`

export const OpacityBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--opacity-background);
    z-index: 3;
`

export const UnreadIcon = styled.div`
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: var(--primary-orange);
    border: 1px solid var(--opacity-background);
    border-radius: 50%;
    top: 0px;
    right: 0px;
`