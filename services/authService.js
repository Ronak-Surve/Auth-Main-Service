const jwt = require("jsonwebtoken");
const config = require("../config");

function setUser(user)  {

    return jwt.sign({
        email : user.email,
        _id : user._id,
        role : user.role,
    }, config.SECRET_KEY);
}

function getUser(token) {

    if(!token)  return null;
    try {
        return jwt.verify(token, config.SECRET_KEY);
    }
    catch(err)  {
        return null;
    }
    
}

module.exports = {setUser, getUser};