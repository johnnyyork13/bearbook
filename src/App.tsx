import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import './styles/reset.css';
import './styles/App.css';

import HeaderMain from './components/primary/HeaderMain';
import Main from './components/primary/Routes';

function App() {

  interface currentLocation {
    pathname: string;
  }

  const location: currentLocation = useLocation();

  const AppContainer = styled.div`
  ${location.pathname !== "/login" && location.pathname !== "/" ? `
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 64px 1fr;` :

  `display: flex;
  align-items: center;
  justify-content: center;`}

  height: 100%;
  background-color: var(--secondary-color);
`

  return (
    <AppContainer>
      {(location.pathname !== "/login" && location.pathname !== "/") && <HeaderMain />}
      <Main />
    </AppContainer>
  )
}


export default App
