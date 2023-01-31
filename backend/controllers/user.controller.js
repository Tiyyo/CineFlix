const UserModel = require("../models/user.models");

module.exports.createUser = async (req, res) => {
  if (!req.body.username) {
    res.status(400).json({ message: "User information are required" });
  }

  const user = await UserModel.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  res.status(200).json(user);
};
