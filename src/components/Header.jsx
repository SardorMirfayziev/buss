import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import bus from "../assets/img/bus.png"
import iut from "../assets/img/iut.jpg"
const Header = () => {

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
                    <li><Link to={"/auth"}>Auth</Link></li>
                    <li><Link to={"/destination"}>Destination</Link></li>
                    <li><Link to={"/operators"}>Operators</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
