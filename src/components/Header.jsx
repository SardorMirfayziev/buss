import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import {Link, useParams} from "react-router-dom";
import bus from "../assets/img/bus.png"
import iut from "../assets/img/iut.jpg"


const Header = () => {
    const [userType] = useState(localStorage.getItem('userType'))
    const logout = () => {
        localStorage.removeItem('userType')
        localStorage.removeItem('uId')
        window.location.reload()
    }
    return (
        <div className="header">
            <div className="logo">
                <img src={bus} alt=""/>
                <img src={iut} alt=""/>
                <p>Bus Reservation System</p>
            </div>
            <nav className="h-nav">
                <ul className="link5">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/auth"}>Login</Link></li>
                    {
                        !userType && <li><Link to={"/register"}>Register</Link></li>
                    }

                    {
                        userType && userType == "superadmin" && <li><Link to={"/destination"}>Destination</Link></li>
                    }
                    {
                        userType && userType == "superadmin" && <li><Link to={"/operators"}>Operators</Link></li>
                    }
                    {
                        userType && <li><Link to={"/account"}>Account</Link></li>
                    }
                    <li onClick={()=> logout()}><a>Logout</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
