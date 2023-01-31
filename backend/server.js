const express = require("express");
const port = 5000;

const app = express();

app.use("/user", require("./routes/user.routes"));

app.listen(() => console.log("le server a demaré au port " + port));
