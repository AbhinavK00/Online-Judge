const Question = require('../models/question');

const checkAns = async (req, res) => {
    const output = req.body.output;
    const { id } = req.params;
    const quesId = id;

    if (quesId === undefined) {
        return res.status(400).json({ success: false, error: "missing id query parameter" });
    }

    const ques = await Question.findById(quesId);

    if (ques === undefined) {
        return res.status(404).json({ success: false, error: "invalid question id" });
    }
    const answers = ques['answers'];

    const verdict = (output === answers);
    //console.log(req.body);
    console.log(output);
    console.log(answers);
    console.log(verdict);

    return res.status(200).json({success : true, verdict});
};

module.exports = checkAns;