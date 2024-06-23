const express = require("express");
const {loadRegisterPage, loadLoginPage} = require("../controllers/staticController");

const staticRoutes = express.Router();

staticRoutes.route("/register")
.get(loadRegisterPage);

staticRoutes.route("/login")
.get(loadLoginPage)

module.exports = staticRoutes;