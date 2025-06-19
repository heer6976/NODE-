const express = require("express")
const infoRoute = require("./src/routes/info")
const userRoute = require("./src/routes/user")
const { infoMiddleware} = require("./src/middleware/info")

const app = express()

app.use(infoMiddleware)
app.use("/user", infoMiddleware)
app.use(infoRoute)
app.use("/user", userRoute)
app.use((error, req, res, next) => {
    console.log("Error Middleware called")
    console.log(error)
    res.status(500).json({ msg: "Server Error", error: error })
}
)

app.listen(8000)

