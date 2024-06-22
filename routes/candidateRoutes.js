const express = require("express");
const {createCandidate,fetchCandidates} = require("../controllers/candidateController");

const candidateRoutes = express.Router();

candidateRoutes.route("/candidate")
.post(createCandidate)
.get(fetchCandidates);

module.exports = candidateRoutes;