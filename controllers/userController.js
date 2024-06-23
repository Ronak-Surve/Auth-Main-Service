const mongoose = require("mongoose");
const express = require("express");
const userModel = require("../models/userModel");
const generateApiKey = require("../utilities/generateApiKey");
const {setUser, getUser} = require("../services/authService");
const bcrypt = require("bcrypt");
const config = require("../config");
const jwt = require("jsonwebtoken");

async function HandleUserRegistration(req,res) {

    const body = req.body;

    if(!body.first_name || !body.last_name || !body.email || !body.password) {
        return res.render("signup", {
            message : "All fields are required",
        });
    }

    const apiKey = generateApiKey();

    await userModel.create({
        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email,
        salt : body.salt,
        password_hash : body.password,
        api_key : apiKey, 
    });

    return res.render("login");

}

async function HandleUserLogin(req,res)  {

    const body = req.body;

    const user = await userModel.findOne({
        email : body.email,
    });

    if(!user) return res.status(404).json({message : "Invalid Email-ID"});

    const isMatch = await bcrypt.compare(body.password, user.password_hash);

    if(!isMatch) return res.status(401).json({message : "Invalid Password"});

    const token = setUser(user);

    res.cookie("token", token);

    return res.render("home");
}

async function fetchPersonalDetails(req,res) {

    const apiKey = req.headers["api-key"];

    const user = await userModel.findOne({
        api_key : apiKey,
    });

    if(!user) return res.status(404).json({message : "Api key Invalid"});

    return res.status(200).json({
        first_name : user.first_name,
        last_name : user.last_name,
        email : user.email,
    })
}

async function ProtectedResource(req,res)    {

    res.send({message : "This is a protected resource"});
}

async function getApiKey(req,res)   {

    const body = req.user;

    const user = await userModel.findOne({
        email : body.email,
    });

    if(!user) return res.status(404).json({message : "User does not exist"});

    const apiKey = user.api_key;

    return res.status(200).send(apiKey);
}

module.exports = {HandleUserRegistration, HandleUserLogin, fetchPersonalDetails,ProtectedResource, getApiKey}