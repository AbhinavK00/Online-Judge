const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    lang : {
        type : String,
        required : true,
        enum : ['cpp', 'py'],
    },
    filePath : {
        type : String,
        required : true,
    },
    inputPath : {
        type : String,
        required : true,
    },
    submittedAt : {
        type : Date,
        default: Date.now,
    },
    startedAt : {
        type: Date,
    },
    completedAt : {
        type : Date,
    },
    status : {
        type : String,
        default : "Pending",
        enum : ["Pending", "Success", "Error"]
    },
    output : {
        type : String,
    },
});

module.exports = mongoose.model('job', JobSchema);