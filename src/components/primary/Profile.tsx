import {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';

export default function Profile(props: {url: String}) {

    const navigate = useNavigate();
    const globalUser = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!globalUser.loggedIn) {
            navigate("/login");
        }
    }, []);

    return (
        <main>
            Profile
        </main>
    )
}