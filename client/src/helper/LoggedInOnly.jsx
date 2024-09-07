import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function LoggedInOnly () {
    const [ans, setAns] = useState(false); 

    useEffect(() => {
        axios.get('/profile')
        .then((res) => {
            //console.log(!!null);
            setAns(!!res);
            //console.log(!!null);

            if(!ans){
                toast.error("Please login first");
            }
        }).catch(err => console.log(err));
    },[]);

    return true ? <Outlet/> : <Navigate to="/"/> 
    //this ^^^^ currently works all the time, change to "ans" when mistake is found and corrected
}
