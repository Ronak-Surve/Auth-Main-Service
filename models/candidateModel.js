const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
}, {timestamps : true});

const candidateModel = mongoose.model("Candidate", candidateSchema);

module.exports = {candidateModel};