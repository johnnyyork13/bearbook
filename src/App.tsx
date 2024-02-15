import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import './styles/reset.css';
import './styles/App.css';

import HeaderMain from './components/primary/HeaderMain';
import Main from './components/primary/Routes';

interface currentLocation {
  pathname: string;
}

function App() {

  const url = "http://localhost:3000";

  const location: currentLocation = useLocation();

  return (
    <AppContainer $location={location}>
      {(location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/logout") && 
        <HeaderMain url={url}/>}
      <Main url={url} />
    </AppContainer>
  )
}


export default App

const AppContainer = styled.div<{$location: currentLocation}>`
${props => props.$location.pathname !== "/login" && 
  props.$location.pathname !== "/" && 
  props.$location.pathname !== "/logout" ? `
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 64px 1fr;` :

`display: flex;
align-items: center;
justify-content: center;`}

height: 100%;
background-color: var(--secondary-color);
`