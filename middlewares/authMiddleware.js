const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config");

async function checkForLoggedInUser(req , res, next)    {

    const token = req.cookies.token;

    if(!token)  {
        return res.statsu(401).json({message : "Non-authorized token access"});
    }
    
    try {
        jwt.verify(token, config.SECRET_KEY);
    }
    catch(err)  {
        //Internal Server error
        res.status(500).json({message : "Server error 500"});
    }

    //sending user object in request to fetch candidates created by the user only
    req.user = user;
    next();
}

module.exports = {checkForLoggedInUser};

