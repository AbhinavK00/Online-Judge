import { useState, useEffect } from 'react'
import { useContext } from "react"
import axios from 'axios'
import moment from 'moment'
import stubs from '../assets/defaultStubs';
import { UserContext } from "../helper/userContext"
import { useParams } from 'react-router-dom';


export function Compiler() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [statement, setStatement] = useState('');
  const [testCases, setTestCases] = useState('');
  const [answers, setAnswers] = useState('');
  //
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('cpp');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [jobId, setJobId] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setCode(stubs[lang])
  }, [lang]);

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

  const renderTimeDetails = () => {
    if(!jobDetails){
      return "";
    }

    let result = '';
    let {submittedAt, completedAt, startedAt} = jobDetails;
    submittedAt = moment(submittedAt).toString();
    result += `Submitted At : ${submittedAt}`;
    if(!completedAt || !startedAt){
      return result;
    }

    const start = moment(startedAt);
    const end = moment(completedAt);
    const execTime = end.diff(start, 'seconds', true);
    result += `\n Execution Time : ${execTime}`;
    return result;
  };

  const handleRun = async () => {
    try {
      setOutput('');
      setJobId(null);
      setStatus(null);
      setJobDetails(null);
      const { data } = await axios.post(`/run/`+id, {
        lang,
        code,
        input,
      });
      if (data.jobId) {
        console.log(jobId);
        setJobId(data.jobId);
        let intervalId;
        intervalId = setInterval(async () => {
          const { data: dataRes } = await axios.get(
            "/status", 
            { params: { id: data.jobId } }
          );

          const { success, job, error } = dataRes;

          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);

            if (jobStatus === "pending") return;
            setOutput(jobOutput);
            clearInterval(intervalId);
          } else {
            setStatus('Error: Please retry!');
            console.error(error);
            clearInterval(intervalId);
            setOutput(error);
          }
          console.log(dataRes);
        }, 1000);
      } else {
        setOutput("Retry again");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        console.log(errMsg);
      } else {
        setOutput("Please retry submitting");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setOutput('');
      setJobId(null);
      setStatus(null);
      setJobDetails(null);
      const { data } = await axios.post(`/submit/`+id, {
        lang,
        code,
      });
      if (data.jobId) {
        setJobId(data.jobId);
        let intervalId;
        intervalId = setInterval(async () => {
          const { data: dataRes } = await axios.get(
            "/status", 
            { params: { id: data.jobId } }
          );

          const { success, job, error } = dataRes;

          if (success) {
            const { status: jobStatus, output: jobOutput } = job;
            setStatus(jobStatus);
            setJobDetails(job);

            if (jobStatus === "pending") return;
            const { verdict } = await axios.post('/check/'+id, { output : jobOutput });
            if(!verdict){
              setStatus("Failure");
            }
            setOutput(jobOutput);
            clearInterval(intervalId);
          } else {
            setStatus('Error: Please retry!');
            console.error(error);
            clearInterval(intervalId);
            setOutput(error);
          }
          console.log(dataRes);
        }, 1000);
      } else {
        setOutput("Retry again");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        console.log(errMsg);
      } else {
        setOutput("Please retry submitting");
      }
    }
  };

  return (
    <div>
      <h1>Online code Compiler</h1>
      {!!user && (<h2>Hi {user.name}!</h2>)}

      <div align="left">
        <textarea rows="2" cols="75" value={name} readOnly></textarea>
        <br/>
        <textarea rows="2" cols="75" value={statement} readOnly></textarea>
        <br/>
        <textarea rows="5" cols="75" value={testCases} readOnly></textarea>
        <br/>
        <textarea rows="2" cols="75" value={answers} readOnly></textarea>
        <br/>
      </div>

      <div>
        <label>Language</label>
        <select
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
            console.log(e.target.value);
          }}>
          <option value='cpp'>C++</option>
          <option value='py'>Python</option>
        </select>
      </div>
      <br />
      <textarea
        rows="20" cols="75"
        value={code}
        onChange={(e) => {

          setCode(e.target.value);
        }}></textarea>
      <br />
      <textarea
        rows="5" cols="75"
        value={input}
        onChange={(e) => {

          setInput(e.target.value);
        }}></textarea>
      <br />
      <button onClick={handleRun}>Run</button>
      <button onClick={handleSubmit}>Submit</button>
      <p>{status}</p>
      <p>{renderTimeDetails()}</p>
      <p>{output}</p>
    </div>
  )
}