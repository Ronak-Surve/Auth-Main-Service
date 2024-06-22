const crypto = require("crypto");

const generateApiKey = () =>   {
    return crypto.randomBytes(30).toString("hex");
};

module.exports = generateApiKey;