import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        if(user === null){
            toast.error("Please login first");
            navigate('/');
        }
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