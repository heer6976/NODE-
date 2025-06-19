const auth = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        return res.json({ msg: "not authenticated" })
    }
}

module.exports = auth