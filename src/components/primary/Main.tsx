import { NavLink, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';


export default function Main() {

    const url = "http://localhost:3000";

    return <Routes>
        <Route path="/" element={<Home url={url}/>}></Route>
        <Route path="/login" element={<Login url={url}/>}></Route>
        <Route path="/profile" element={<Profile url={url}/>}></Route>
        <Route path="/signup" element={<Signup url={url}/>}></Route>
    </Routes>
}