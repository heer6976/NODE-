require("dotenv").config()
const express = require("express")
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)
const connectDB = require("./src/config/dbCofig")
const userRoutes = require("./src/routes/users")
const productRoute = require ("./src/routes/product")


const app = express()
// app.use(cors())

// app.use("/product", productRoute)

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: true,
        httpOnly: true,
        sameSite: 'strict'
    },
    store: new MongoStore(
        {
            url: process.env.MONGO_URL
        }
    )
}))


app.use("/user", userRoutes)
app.use("/product", productRoute)

app.get("/test", (req, res) => {
    res.json({ msg: "server is running" })
})

app.get("/get-data", (req, res) => {
    console.log(req.cookies)
    res.json({ msg: `get cookies from frontend to backend ${JSON.stringify(req.cookies)}` })
})

app.get("/set-data", (req, res) => {
    res.cookie("key", "value", { httpOnly: true, maxAge: 30000, secure: true, sameSite: "none" })
    res.json({ msg: "set cookies from backend to frontend" })
})

app.get("/data", (req, res) => {
    res.clearCookie("key")
    res.json({ msg: "remove cookies from backend to frontend" })
})

app.listen(PORT, () => {
    connectDB()
    console.log("server stared on " + PORT)
})