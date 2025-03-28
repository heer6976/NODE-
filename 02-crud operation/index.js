const express = require("express")
const bookRoutes = require("./src/routes/books")


const app = express()

app.get("/", (req, res) => {
    res.send("Server is running")
})
app.use("/books", bookRoutes)

app.listen(8000)