import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('none');

    const handleLogout = () => {
        axios.get('/logout')
        .then(res => {
            if(res.data.success){
                console.log(res);
                setIsLoggedIn(false);
                navigate('/');
            }
        }).catch(err => console.log(err))
    }; 
    
    useEffect(() => {
        axios.get('/verify')
        .then((res) => {
            if(res.data.success){
                setIsLoggedIn(true);
                setUserName(res.data.user.name);
            }
        }).catch(err => console.log(err));
    },[]);

    return (
        <nav>
            <Link to = '/'>Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            { isLoggedIn ? <label>{userName}</label> : <Link to = '/register'>Register</Link> }
            { isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <Link to = '/login'>Login</Link> }
        </nav>
    )
}