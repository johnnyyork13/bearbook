import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from '../../state/store';
import { setGlobalUser } from "../../state/user/userSlice";

export default function Login(props) {
    const globalUser = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const [sendUser, setSendUser] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        try {
            if (sendUser) {
                async function loginUser() {
                    const url = props.url + "/login";
                    await fetch(url, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(user),
                    }).then((res) => res.json())
                    .then((res) => {
                        setSendUser(false);
                        dispatch(setGlobalUser(res));
                    }).catch((err) => {
                        console.log(err);
                        setSendUser(false);
                    });
                }
                loginUser();
            }
        } catch(err) {  
            setSendUser(false);
            console.log(err);
        }
    }, [sendUser])

    console.log("GLOBALUSER", globalUser);

    return (
        <main>
            <form onSubmit={(e) => e.preventDefault()}>
                <input name="email" onChange={handleInputChange} placeholder="Email"/>
                <input name="password" onChange={handleInputChange} placeholder="Password"/>
                <button onClick={() => setSendUser(true)}>Submit</button>
            </form>
        </main>
    )
}