const test = (req, res) => {
    res.status(200).json({ msg: "GET API CALLED"})
}


module.exports = { test }