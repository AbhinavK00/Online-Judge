import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

export default function Navbar(){
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const handleLogout = () => {
        axios.get('/logout')
        .then(res => {
            if(res.data.success){
                console.log(res);
                navigate('/');
            }
        }).catch(err => console.log(err))
    }; 
    
    return (
        <nav>
            <Link to = '/'>Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            { user ? <label>{user.name}</label> : <Link to = '/register'>Register</Link> }
            { user ? <button onClick={handleLogout}>Logout</button> : <Link to = '/login'>Login</Link> }
        </nav>
    )
}