const mongoose = require('mongoose');

const QuesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    statement : {
        type : String,
        required : true,
    },
    testCases : {
        type : String,
        required : true,
    },
    answers : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('question', QuesSchema);