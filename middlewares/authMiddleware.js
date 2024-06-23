const express = require("express");
const {setUser, getUser} = require("../services/authService");

async function checkForLoggedInUser(req , res, next)    {

    const token = req.cookies.token;

    if(!token)  {
        return res.status(401).json({message : "Non-authorized token access"});
    }

    const user = getUser(token);

    if(!user)   {
        return res.render("login");
    } 

    //sending user object in request to fetch candidates created by the user only
    req.user = user;
    next();
}

module.exports = {checkForLoggedInUser};

