import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";


export default function AdminOnly () {
    const [ans, setAns] = useState(false); 

    useEffect(() => {
        axios.get('/ques')
        .then((res) => {
            //console.log(res.data.success);
            setAns(res.data.success);
            //console.log(ans);

            if(!ans){
                toast.error("You are not an admin");
            }
        }).catch(err => console.log(err));
    },[]);

    return true ? <Outlet/> : <Navigate to="/"/>
    //this ^^^^ currently works all the time, change to false when mistake is found and corrected
}