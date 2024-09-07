import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditQuestions (){
    const { id } = useParams();
    const [name, setName] = useState('');
    const [statement, setStatement] = useState('');
    const [testCases, setTestCases] = useState('');
    const [answers, setAnswers] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/ques/'+id)
        .then(res => {
            console.log(res);
            setName(res.data.name);
            setStatement(res.data.statement);
            setTestCases(res.data.testCases);
            setAnswers(res.data.answers);
        })
        .catch(err => console.log(err));
    }, []);

    const Update = (e) => {
        e.preventDefault();
        axios.put('/ques/update/'+id, {name, statement, testCases, answers})
        .then(res => {
            console.log(res);
            navigate('/ques/list');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div>
                <form onSubmit={Update}>
                    <h2>Update Question</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type = "text" placeholder="Enter Name" className="form-control"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Statement</label>
                        <input type = "text" placeholder="Enter the question statement" className="form-control"
                            value={statement} onChange={(e) => setStatement(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Test Cases</label>
                        <input type = "text" placeholder="Enter the test cases to check" className="form-control"
                            value={testCases} onChange={(e) => setTestCases(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Answers</label>
                        <input type = "text" placeholder="Enter the answers for each test case" className="form-control"
                            value={answers} onChange={(e) => setAnswers(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}