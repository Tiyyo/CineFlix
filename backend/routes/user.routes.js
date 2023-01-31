const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user.controller");

router.post("/", createUser);

module.exports = router;


router.get('/', (req,res) => res.json({message : 'voici un message'}))
module.exports = router