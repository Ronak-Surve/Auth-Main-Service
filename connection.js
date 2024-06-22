const { default: mongoose } = require("mongoose");

async function connectDB(MONGO_DB_URL)  {

    await mongoose.connect(MONGO_DB_URL);
}

module.exports = connectDB;