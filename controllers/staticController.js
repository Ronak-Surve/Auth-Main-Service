const express = require("express");

async function loadRegisterPage(req,res)    {

    return res.render("register");
}

async function loadLoginPage(req,res)    {

    return res.render("login");
}

module.exports = {loadRegisterPage, loadLoginPage};


