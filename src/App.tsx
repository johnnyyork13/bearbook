import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import './styles/reset.css';
import './styles/App.css';
import { useSelector } from 'react-redux';
import { RootState } from './state/store';
import HeaderMain from './components/primary/HeaderMain';
import Main from './components/primary/Routes';

interface currentLocation {
  pathname: string;
}

function App() {

  const globalUser = useSelector((state: RootState) => state.user);
  const location: currentLocation = useLocation();

  // const url:string = import.meta.env.VITE_FIREBASE_API_URL!;
  const url:string = import.meta.env.VITE_LOCALHOST_URL!;

  const [chatWindow, setChatWindow] = useState({
    show: false,
    email: "",
    name: "",
  });
  const [friendsDefaultSection, setFriendsDefaultSection] = useState("all");

  useEffect(() => {
    setFriendsDefaultSection("all");
  }, [])

  return (
    <AppContainer $location={location} $dark={globalUser.settings.theme === "dark" ? true : false}>
      {(location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/logout") && 
        <HeaderMain url={url} chatWindow={chatWindow} setChatWindow={setChatWindow}/>}
      <Main url={url} setChatWindow={setChatWindow} friendsDefaultSection={friendsDefaultSection} setFriendsDefaultSection={setFriendsDefaultSection}/>
    </AppContainer>
  )
}


export default App

const AppContainer = styled.div<{$location: currentLocation, $dark: boolean}>`
  ${props => props.$location.pathname !== "/login" && 
    props.$location.pathname !== "/" && 
    props.$location.pathname !== "/logout" ? `
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 64px 1fr;` :

      `display: flex;
      align-items: center;
      justify-content: center;`}
      min-height: 100vh;
      background-color: var(--secondary-color);
      padding-bottom: 50px;

    ${props => props.$dark ? `
      --primary-orange: #475569;
      --primary-black: #1e293b;
      --primary-color: #94a3b8;
      --secondary-color: #e2e8f0;
      --hover-orange-background: #64748b;
      --hover-background: #64748b; 
    ` : `
    --primary-orange: #f76800;
    --primary-black: #222;
    --primary-color: white;
    --secondary-color: white;
    --hover-orange-background: #f767009d;
    --hover-background: rgb(231, 231, 231);
    `}
`