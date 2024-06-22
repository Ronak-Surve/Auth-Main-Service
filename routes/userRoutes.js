const express = require("express");
const {HandleUserRegistration, HandleUserLogin, ProtectedResource, getApiKey} = require("../controllers/userController");
const {checkForLoggedInUser} = require("../middlewares/authMiddleware");
const userRoutes = express.Router();

userRoutes.route("/register")
.get(loadRegisterPage)
.post(HandleUserRegistration);

userRoutes.route("/login")
.get(loadLoginPage)
.post(HandleUserLogin);

userRoutes.route("/protected")
.get(checkForLoggedInUser, ProtectedResource)
.post(checkForLoggedInUser, ProtectedResource);

userRoutes.route("/apiKey")
.get(checkForLoggedInUser, getApiKey)
.post(checkForLoggedInUser, getApiKey);

module.exports = userRoutes;