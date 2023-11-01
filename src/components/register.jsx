import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./DatabaseReqs";
import { CheckSession } from "./DatabaseReqs";
export default function Register() {
    const navigate = useNavigate();
    const [Username, SetUsername] = useState();
    const [Password, SetPassword] = useState();
    const [CompletedRegistration, SetCompletedRegistration] = useState(false);
    async function HandleSubmit(ev) {
        ev.preventDefault();


        try {
            const data = await Signup(Username, Password);
            console.log(data);
            if (data != 'login') {
                var signuperror = document.getElementById("signuperror");
                signuperror.style.display = "flex";
                signuperror.innerHTML = data;
                console.log(data);
                return;
            } else {
                CheckSession()
                    .then(data => {
                        console.log(data);
                        if (data === "Logged in") {
                            console.log("you are already logged in");
                            navigate('/');
                            window.location.reload();
                            return;
                        } else {
                        }
                    })

                SetCompletedRegistration(true)
            }
            CheckSession()
                .then(data => {
                    console.log(data);
                    if (data === "Logged in") {
                        console.log("you are already logged in");
                        navigate('/');
                        window.location.reload();
                        return;
                    } else {
                    }
                })
        } catch (error) {
            console.error(error.response.data);
        }
    }
    useEffect(() => {
        if (CompletedRegistration) {
            navigate('/');
            window.location.reload();
        }
    }, CompletedRegistration)

    useEffect(() => {
        CheckSession()
            .then(data => {
                console.log(data);
                if (data === "Logged in") {
                    console.log("you are already logged in");
                    navigate('/');
                    window.location.reload();
                    return;
                } else {
                }
            })

    }, [])

    return (
        <form className="signup form-group" onSubmit={ev => {
            HandleSubmit(ev)
        }}>
            <h1 className="text-white text-center mb-4">Register</h1>
            <div className="input-container">
                <label className="h5">Username</label>
                <input className="mt-1 inputslog" value={Username} onChange={ev => SetUsername(ev.target.value)} />
            </div>
            <div className="input-container">
                <label className="h5" >Password</label>
                <input className="mt-1 inputslog" value={Password} onChange={ev => SetPassword(ev.target.value)} />
            </div>
            <input type="submit" className="logbutton h3" id="signbutton" value={"Sign up"} />
            <div id="signuperror" className="text-danger error">Error trying to register</div>
        </form>
    );

}