const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const Question = require('../models/question');

const dirCodes = path.join(__dirname, 'codes');
const dirInput = path.join(__dirname, 'input');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(dirInput)) {
    fs.mkdirSync(dirInput, { recursive: true });
}

const generateFileforSubmission = async (format, content, quesId) => {
    const ques = await Question.findById(quesId);

    if(ques === undefined) {
        throw Error(JSON.stringify(err));
    }
    const input = (ques['testCases']);
    
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const inputname = `${jobID}.txt`;
    const filePath = path.join(dirCodes, filename);
    const inputPath = path.join(dirInput, inputname);
    fs.writeFileSync(inputPath, input);
    fs.writeFileSync(filePath, content);
    return {filePath, inputPath};
};

const generateFileforRun = async (format, content, input) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`;
    const inputname = `${jobID}.txt`;
    const filePath = path.join(dirCodes, filename);
    const inputPath = path.join(dirInput, inputname);
    fs.writeFileSync(inputPath, input);
    fs.writeFileSync(filePath, content);
    return {filePath, inputPath};
};

module.exports = {
    generateFileforSubmission,
    generateFileforRun,
};