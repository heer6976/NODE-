const express = require("express")
const bookRoutes = require("./src/routes/booksrouter")


const app = express()

app.get("/", (req, res) => {
    res.send("Crud Server is running")
})
app.use("/books", bookRoutes)

app.listen(3000)