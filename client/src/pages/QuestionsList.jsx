import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function QuestionsList() {
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        axios.get('/ques/list')
        .then(res => setQuestions(res.data))
        .catch(err => console.log(err))
    }, []);

    const handleDelete = (id) => {
        axios.delete('/ques/update/'+id)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to = "/ques/add" className="btn btn-success">Add</Link>
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
                                        <Link to = {`/ques/update/${ques._id}`} className="btn btn-success">Update</Link>
                                        <button className="btn btn-danger" 
                                        onClick={(e) => handleDelete(ques._id)}>Delete</button>
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