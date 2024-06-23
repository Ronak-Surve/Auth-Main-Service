const express = require("express");
const {HandleUserRegistration, HandleUserLogin,fetchPersonalDetails, ProtectedResource, getApiKey} = require("../controllers/userController");
const {checkForLoggedInUser} = require("../middlewares/authMiddleware");

const userRoutes = express.Router();

userRoutes.route("/register")
.post(HandleUserRegistration);

userRoutes.route("/login")
.post(HandleUserLogin);

userRoutes.route("/profile")
.get(fetchPersonalDetails);

userRoutes.route("/protected")
.get(checkForLoggedInUser, ProtectedResource)
.post(checkForLoggedInUser, ProtectedResource);

userRoutes.route("/apiKey")
.get(checkForLoggedInUser, getApiKey);

module.exports = userRoutes;