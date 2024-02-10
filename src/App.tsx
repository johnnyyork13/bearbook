import { useState } from 'react';
import styled from 'styled-components';
import './styles/reset.css';
import './styles/App.css';

import HeaderMain from './components/HeaderMain';
import { Sidebar } from './components/Sidebar';
import Feed from './components/Feed';
import Contacts from './components/Contacts';


const HomeContainer = styled.div`
  background-color: var(--secondary-color);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas: 
    "header header header"
    "sidebar feed contacts";
  gap: 30px;
`



function App() {

  return (
    <HomeContainer>
      <HeaderMain />
      <Sidebar />
      <Feed />
      <Contacts />
    </HomeContainer>
  )
}

export default App
