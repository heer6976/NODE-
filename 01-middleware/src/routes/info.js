const express = require("express")
const { test } = require("../controllers/info")
const route = express.Router()

route.get("/", test)

module.exports = route