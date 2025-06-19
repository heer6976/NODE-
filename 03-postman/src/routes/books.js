const express = require("express")
const { getAll, getOne, createOne, updateOne, deleteOne } = require("../controllers/books")

const route = express.Router()


route.get("/getAll", getAll)
route.get("/getOne", getOne)
route.post("/createOne", createOne)
route.put("/updateOne", updateOne)
route.delete("/deleteOne", deleteOne)

module.exports = route