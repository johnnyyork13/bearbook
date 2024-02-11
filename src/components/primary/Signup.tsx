import {useEffect, useState} from "react";

export default function Signup(props) {

    const [sendUser, setSendUser] = useState(false);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    function  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    useEffect(() => {
        try {
            if (sendUser) {
                console.log('sending user');
                async function addUser() {
                    const url = props.url + '/signup';
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
                        console.log("SIGNUP RESPONSE ", res);
                    }).catch((err) => console.log(err));
                }
                addUser();
            }
        } catch(err) {
            setSendUser(false);
            console.log(err);
        }
    }, [sendUser]);

    return (
        <main>
            <form onSubmit={(e) => e.preventDefault()}>
                <input name="firstName" placeholder="First Name" onChange={handleInputChange}/>
                <input name="lastName" placeholder="Last Name" onChange={handleInputChange}/>
                <input name="email" placeholder="Email" onChange={handleInputChange}/>
                <input name="password" type="password" placeholder="Password" onChange={handleInputChange}/>
                <button onClick={() => setSendUser(true)}>Submit</button>
            </form>
        </main>
    )
}