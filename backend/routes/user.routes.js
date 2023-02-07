const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", (req, res) => {
  res.json("profile");
});
// router.get("/login", (req, res) => {
//   res.status(200).json({ message: "message essai" });
// });

module.exports = router;
