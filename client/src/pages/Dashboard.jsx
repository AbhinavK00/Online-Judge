import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    /*
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/verify')
        .then( (res) =>{
            if(!res.data.success){
                toast.error("Login first to access dashboard")
                navigate('/');
            }
        })
    }, []);
    */

    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        axios.get('/ques/list')
        .then(res => setQuestions(res.data))
        .catch(err => console.log(err))
    }, []);

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questions.map((ques) => {
                                return <tr key={ques._id}>
                                    <td>{ques.name}</td>
                                    <td>
                                        <Link to = {`/comp/${ques._id}`} className="btn btn-success">Solve</Link>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}