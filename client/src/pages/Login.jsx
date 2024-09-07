import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        email : '',
        password : '',
    });
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = data;

        try {
            const { data } = await axios.post('/login', {
                email,
                password,
            });
            
            if(data.error){
                toast.error(data.error);
            } else {
                setData({});
                toast.success('Login Successful, Welcome!');
                if(data.role === 'admin') {
                    navigate('/ques/list');
                } else {
                    navigate('/dashboard');
                }
            }


        } catch (error) {
           console.log(error); 
        }
    };
    
    
    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type = 'text' placeholder="enter email..." value ={data.email} onChange={(e) => {setData({...data, email : e.target.value})}}/>
                <label>Password</label>
                <input type = 'text' placeholder="enter password..." value ={data.password} onChange={(e) => {setData({...data, password : e.target.value})}}/>
                <button type = 'submit'>Login</button>
            </form>
            <p>Don't Have an Account? Register Here</p>
            <button onClick={(e) => {navigate('/register')}}>Register</button>
        </div>
    )
}