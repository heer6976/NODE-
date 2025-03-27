const express = require("express")
const { user, user2 } = require("../controllers/user")
const route = express.Router()
const { infoMiddleware } = require("../middleware/info")

route.get("/", infoMiddleware,  user)
// route.get("/2", user2)
// route.get("/3", user2)
// route.get("/4", user2)
route.get("/2|3|4|user2", user2)

module.exports = route