import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddQuestions (){
    const [name, setName] = useState();
    const [statement, setStatement] = useState();
    const [testCases, setTestCases] = useState();
    const [answers, setAnswers] = useState();
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post('/ques/add', {name, statement, testCases, answers})
        .then(res => {
            console.log(res);
            navigate('/ques/list');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div>
                <form onSubmit={Submit}>
                    <h2>Add Question</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type = "text" placeholder="Enter Name" className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Statement</label>
                        <input type = "text" placeholder="Enter the question statement" className="form-control"
                            onChange={(e) => setStatement(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Test Cases</label>
                        <input type = "text" placeholder="Enter the test cases to check" className="form-control"
                            onChange={(e) => setTestCases(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Answers</label>
                        <input type = "text" placeholder="Enter the answers for each test case" className="form-control"
                            onChange={(e) => setAnswers(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}