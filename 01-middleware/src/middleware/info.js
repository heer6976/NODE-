const infoMiddleware = (req, res, next) => {
    console.log("Middlware callded")
    req.setPrams()
    next()
    // res.status(400).json({ msg: "Middlweare says bad req" })
}
const infoErrorMiddle = (error, req, res, next) => {
    console.log("Error Middlware callded")
    console.log(error)
    res.status(500).json({ msg: "Server Error", error: error })
}


module.exports = { infoMiddleware, infoErrorMiddle }