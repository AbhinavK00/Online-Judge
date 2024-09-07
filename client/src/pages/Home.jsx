import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home(){
    return (
        <div>Welcome!
            <br/>
            <button> <Link to="/dashboard">Dashboard</Link></button>
            <br/>
        </div>
    )
}