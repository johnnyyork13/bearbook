import { useEffect, useState } from "react";
import SimpleModal from "../secondary/SimpleModal";
import { useNavigate } from "react-router-dom";

export default function Logout(props: {url: String}) {

    const [logoutText, setLogoutText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        try {
            async function logoutUser() {
                const url = props.url + "/logout";
                await fetch(url, {
                    credentials: "include",
                }).then((res) => res.json())
                .then((res) => {
                    setLogoutText(res.message);
                }).catch((err) => console.log(err));
            }
            logoutUser();
        } catch(err) {
            console.log(err);
        }
    }, [])

    return (
        <SimpleModal 
            mainText={logoutText}
            buttonText={"Return to Login"}
            buttonFunc={() => navigate('/login')}
        />
    )
}