const mongoose = require("mongoose");
const express = require("express");
const userModel = require("../models/userModel");
const generateApiKey = require("../utilities/generateApiKey");
const bcrypt = require("bcrypt");
const config = require("../config");

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

    return res.status(201).json({message : "User registeration successful"})

}

async function HandleUserLogin(req,res)  {

    const body = req.body;

    const user = await userModel.findOne({
        email : body.email,
    });

    if(!user) return res.status(404).json({message : "User does not exist"});

    const isMatch = await bcrypt.compare(body.password, user.password);

    if(!isMatch) return res.status(401).json({message : "Invalid credentials"})

    const token = jwt.sign({
        email : user.email,
        id : user._id
    }, config.SECRET_KEY);

    res.cookie("token", token);

    return res.status(200).json({message : "Successful User Login"});
}

async function ProtectedResource(req,res)    {

    res.send({message : "This is a protected resource"});
}

async function getApiKey

module.exports = {HandleUserRegistration, HandleUserLogin, ProtectedResource}