import { NavLink, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Logout from './Logout';


export default function Main(props: {url: string, setChatWindow: Function}) {

    return <Routes>
        <Route path="/" element={<Login url={props.url}/>}></Route>
        <Route path="/login" element={<Login url={props.url}/>}></Route>
        <Route path="/logout" element={<Logout url={props.url}/>}></Route>
        <Route path="/profile" element={<Profile url={props.url}/>}></Route>
        <Route path="/home" element={<Home url={props.url} setChatWindow={props.setChatWindow}/>}></Route>
    </Routes>
}