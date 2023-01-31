const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccesStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./routes/user.routes"));

app.listen(port, () => console.log("server start at port " + port))