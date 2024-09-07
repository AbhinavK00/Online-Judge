const Question = require('../models/question');


//Endpoint to add questions
const addQuestion = async (req, res) => {
    try {        
        const {name, statement, testCases, answers} = req.body;

        if(!name){
            return res.json({
                error : 'name is required'
            });
        }

        if(!statement){
            return res.json({
                error : 'statement is required'
            });
        }

        if(!testCases){
            return res.json({
                error : 'testCases are needed'
            });
        }

        if(!answers){
            return res.json({
                error : 'answers are needed'
            })
        }

        const question = await Question.create({
            name, statement, testCases, answers,
        });

        return res.status(200).json(question);

    } catch (error) {
        console.log(err);
    }
};

//Endpoint to see questions list
const QuestionsList = async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        res.json(500).json({
            success : false,
            error : error.message
        });
    }
};

//Endpoint for viewing a question
const seeQuestion = async (req, res) => {
    try {
        const {id} = req.params;
        const question = await Question.findById(id);
        res.status(200).json(question);
    } catch (err) {
       res.json(5000).json({
        success : false,
        error : err,
       })
    }
};

//Update questions
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Question.findByIdAndUpdate(id, req.body);

        if(!updated){
            return res.status(404).json({message : "Question not found"});
        }

        res.status(200).json(updated);

    } catch (err) {
       res.json(500).json({
        success : false,
        error : err,
       })
    }
};

//delete a question
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await Question.findByIdAndDelete(id);

        if(!question){
            return res.status(404).json({message : "Question not found"});
        }

        res.status(200).json({message : "Question deleted successfully"});

    } catch (err) {
       res.json(500).json({
        success : false,
        error : err,
        });
    }
        
};

module.exports = {
    addQuestion,
    seeQuestion,
    QuestionsList,
    updateQuestion,
    deleteQuestion,
}