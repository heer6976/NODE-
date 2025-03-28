const express = require("express")
const { getAll, getOne, createOne, updateOne, deleteOne } = require("../controller/books")

const route = express.Router()


route.get("/getAll", getAll)
route.get("/getOne", getOne)
route.get("/createOne", createOne)
route.get("/updateOne", updateOne)
route.get("/deleteOne", deleteOne)

module.exports = route