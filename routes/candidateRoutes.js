const express = require("express");
const {createCandidate,fetchCandidates} = require("../controllers/candidateController");
const {checkForLoggedInUser} = require("../middlewares/authMiddleware");

const candidateRoutes = express.Router();

candidateRoutes.route("/candidate")
.post(checkForLoggedInUser, createCandidate)
.get(checkForLoggedInUser, fetchCandidates);

module.exports = candidateRoutes;