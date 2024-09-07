const Job = require('../models/job');
const { generateFileforSubmission, generateFileforRun } = require('../helper/generateFile');
const { adddJobtoQueue } = require('../helper/jobQueue');

//Getting status of job
const getStatus =  async (req, res) => {
    const jobId = req.query.id;

    if (jobId === undefined) {
        return res.status(400).json({ success: false, error: "missing id query parameter" });
    }

    const job = await Job.findById(jobId);

    if (job === undefined) {
        return res.status(404).json({ success: false, error: "invalid job id" });
    }

    return res.status(200).json({success : true, job});
};


//Running the compiler for a submission
const submitComp = async (req, res) => {
    const { lang = "cpp", code } = req.body;
    const {id} = req.params;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" })
    }

    const {filePath, inputPath} = await generateFileforSubmission(lang, code, id);
    const job = await Job.create({ lang, filePath, inputPath });
    const jobId = job['_id'];
    adddJobtoQueue(jobId);

    res.status(201).json({ success: true, jobId });

};

//running the compiler for user input
const runComp = async (req, res) => {
    const { lang = "cpp", code, input } = req.body;

    if (code === undefined) {
        return res.status(400).json({ success: false, error: "Empty code body" })
    }

    const {filePath, inputPath} = await generateFileforRun(lang, code, input);
    const job = await Job.create({ lang, filePath, inputPath });
    const jobId = job['_id'];
    adddJobtoQueue(jobId);

    res.status(201).json({ success: true, jobId });

};
module.exports = {
    runComp,
    getStatus,
    submitComp,
};
