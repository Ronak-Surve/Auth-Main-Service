const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
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
    salt : {
        type : String,
        default : "salt123",
    },
    password_hash : {
        type : String,
        required : true,
    },
    api_key : {
        type : String,
    }
});

userSchema.pre("save", async function(next) {

    const user = this;

    if(!user.isModified("password_hash")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(this.password_hash, salt);

    this.salt = salt;
    this.password_hash = password_hash;

    next();
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;