const express = require("express")
const bookRoutes = require("./src/routes/books")


const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.json({ msg : "Server is running" })
})

app.use("/books", bookRoutes)

app.listen(8000)