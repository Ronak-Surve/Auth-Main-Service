//import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const ejs = require("ejs");
//import modules
const connectDB = require("./connection");
const config = require("./config");
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const staticRoutes = require("./routes/staticRoutes");

const app = express();

connectDB(config.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log("MongoDB Connected for Main Service")})
.catch((err) => {console.log("MongoDB connection failed for Main Servcie", err)});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", staticRoutes);
app.use("/api", userRoutes);
app.use("/api", candidateRoutes);

app.listen(config.PORT, () => {console.log(`Main Service Listening on PORT ${config.PORT}`)});


