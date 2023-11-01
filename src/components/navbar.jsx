import { Link } from "react-router-dom";
import { CheckSession } from "./DatabaseReqs";
import { useEffect, useState } from "react";
import Logoutimg from '../images/logout.svg';
import { useNavigate } from "react-router-dom";
import { Logout } from './DatabaseReqs';
export default function Navbar() {
    const navigate = useNavigate();
    const [Login, SetLogin] = useState(false);
    function Check() {
        CheckSession()
            .then(data => {
                console.log(data);
                if (data === "Logged in") {
                    SetLogin(true);
                } else {
                    SetLogin(false);
                }
            })
            .catch(error => {
                console.error("Error to verify session", error);
            });
    }

    function Loggingout() {
        Logout();
        navigate('/Login');
        CheckSession();
        window.location.reload();
    }
    useEffect(() => {
        Check();
    }, [])
    return (<nav className="nav flex-row justify-content-between w-100 bg-dark align-items-center" id="navbar">
        {Login ? (
            <div id="home">
                <Link to="/" className="nav-link itemsnav bg-secondary mx-3 text-white h5" >Home</Link>
            </div>
        ) : (
            <Link></Link>
        )

        }

        <div className="h1 text-white" id="logo">TODO App</div>
        <div className="nav flex flex-row " id="logindiv">
            {Login ? (
                <Link to="/Login" id="Login" onClick={(ev) => Loggingout()
                } ><img src={Logoutimg}></img></Link>


            ) : (
                <div id="loginsign">
                    <Link to="/Signup" className="nav-link itemsnav bg-secondary text-white h5">Sign up</Link>
                    <Link to="/Login" className="nav-link itemsnav bg-secondary mx-3 text-white h5" >Login</Link>
                </div>
            )

            }


        </div>

    </nav >


    )
}