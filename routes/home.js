const express = require("express")
const Home = require("../models/home")
const router = express.Router()
  
router.get("/", async (req, res, next) => {
    res.status(200).json(home)
})

module.exports = router