const Queue = require('bull');
const Job = require('../models/job');
const { executeCpp } = require('../helper/executeCpp');
const { executePy } = require('../helper/executePy');

const jobQueue = new Queue('job-Queue');
const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ( { data } ) => {
    const jobId = data.id;
    const job = await Job.findById(jobId);
    if(job === undefined){
        throw Error('job not found');
    }

    try {
        let output;
        job["startedAt"] = new Date();
        if (job.lang === 'cpp') {
            output = await executeCpp(job.filePath, job.inputPath);
        } else if (job.lang === 'py') {
            output = await executePy(job.filePath, job.inputPath);
        }

        job["completedAt"] = new Date();
        job["output"] = output;
        job["status"] = "Success";
        await job.save();

        return true;
    } catch (err) {
        job["completedAt"] = new Date();
        job["output"] = JSON.stringify(err);
        job["status"] = "Error";
        await job.save();
        throw Error(JSON.stringify(err));
    }

});

jobQueue.on('failed', (error) => {
    console.log(error.data.id, error.failedReason);
});

const adddJobtoQueue = async (jobId) => {
    await jobQueue.add({ id : jobId});
};

module.exports = {
    adddJobtoQueue,
};