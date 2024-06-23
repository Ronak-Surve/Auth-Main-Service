const express = require("express");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");
const userModel = require("../models/userModel");

async function createCandidate(req,res) {

    const user = req.user;

    if(!user)   {
        return res.status(401).send("Unauthorized action");
    }

    const body = req.body;

    if(!body.first_name || !body.last_name || !body.email)  {
        return res.send("Enter required fields for Candidate");
    }

    await candidateModel.create({

        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email,
        user_id : user._id,
    });

    return res.redirect("/api/candidate");
}

async function fetchCandidates(req,res)  {

    const user = req.user;

    if(user)    {

        const allCandidates = await candidateModel.find({
            user_id : user._id,
        });
    
        return res.render("candidate", {
            candidates : allCandidates,
        });
    }    

    const apiKey = req.headers['api-key'];

    if(apiKey)  {

        const user = await candidateModel.find({
            api_key : apiKey,
        });

        if(!user)   return res.send("Invalid Api Key");

        const allCandidates = await candidateModel.find({
            user_id : user._id,
        });

        return res.json(allCandidates);
    }

    return res.status(404).send("Unauthorized access");

}

module.exports = {createCandidate,fetchCandidates};