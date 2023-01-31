const express = require('express')
const router = express.Router()

router.get('/', (req,res) => res.json({message : 'voici un message'}))

module.exports = router