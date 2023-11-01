import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Log } from './DatabaseReqs';
import { useEffect, useState } from "react";
import { CheckSession } from "./DatabaseReqs";
export default function Login() {
    const navigate = useNavigate();
    const [Username, SetUsername] = useState('');
    const [Password, SetPassword] = useState('');
    const [CompletedLogin, SetCompletedLogin] = useState(false);
    async function HandleSubmit(ev) {
        ev.preventDefault();
        try {
            const data = await Log(Username, Password)
            console.log(data);

            if (data != "successful login") {
                var loginerror = document.getElementById('loginerror');
                loginerror.style.display = "flex";
                loginerror.innerHTML = data;
                return;
            } else {
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error(error.response.data);
        }
    }

    useEffect(() => {
        if (CompletedLogin) {
            navigate('/');
            window.location.reload();
        }
    }, SetCompletedLogin)

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
            <h1 className="text-white text-center mb-4">Login</h1>
            <div className="input-container">
                <label className="h5">Username</label>
                <input className="mt-1 inputslog" value={Username} onChange={ev => SetUsername(ev.target.value)} />
            </div>
            <div className="input-container">
                <label className="h5" >Password</label>
                <input className="mt-1 inputslog" type="password" value={Password} onChange={ev => SetPassword(ev.target.value)} />
            </div>
            <input type="submit" className="logbutton h3" id="signbutton" value={"Login"} />
            <div id="loginerror" className="error text-danger">Error trying to Login</div>
        </form>
    );
}