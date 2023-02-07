const UserModel = require("../models/user.models");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModels = require("../models/user.models");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { createTokens } = require("./JWT");

module.exports.createUser = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    if (!(username && firstName && lastName && email && password)) {
      res.status(400).send("All input is required");
    }

    const emailUsed = await UserModel.findOne({ email });

    if (emailUsed) {
      return res.status(409).send("User already exist. Please Login");
    }

    const usernameUsed = await UserModel.findOne({ username });

    if (usernameUsed) {
      return res.status(409).send("This username is already taken");
    }
    encryptedUserPassword = await bycrypt.hash(password, 10);

    const user = await UserModel.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptedUserPassword,
    });

    const accesToken = createTokens(user);

    user.token = accesToken;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (!user) res.status(400).json({ error: " User doesn't exist" });

  const dbPassword = user.password;
  const isMatch = bycrypt.compare(password, dbPassword);

  if (isMatch) res.status(200).send(isMatch);
  // bycrypt.compare(password, dbPassword).then((match) => {
  //   if (!match) {
  //     res
  //       .status(400)
  //       .json({ error: "Wrong Username and Password Combination" });
  //   } else {
  //     res.json("logged In");
  //   }
  // });
};
