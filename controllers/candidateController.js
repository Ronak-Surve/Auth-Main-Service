const express = require("express");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");

async function createCandidate(req,res) {

    const body = req.body;

    if(!body.first_name || !body.last_name || !body.email)  {
        return res.send("Enter required fields");
    }

    const user = req.user;

    if(!user)   {
        return res.status(401).send("Unauthorized action");
    }

    await candidateModel.create({

        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email,
        user_id : user._id,
    });

    return res.status(201).send("New candidate inserted");


}

async function fetchCandidates(req,res)  {

    const user = req.user;

    if(!user)   {
        return res.status(401).send("Unauthorized action");
    }

    const allCandidates = await candidateModel.find({
        id : user._id,
    });

    res.status(200).send(allCandidates);
}

module.exports = {createCandidate,fetchCandidates};