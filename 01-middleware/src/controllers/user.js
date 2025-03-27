const user = (req, res) => {
    res.status(200).json({ msg: "USER CALLED" })
}
const user2 = (req, res) => {
    res.status(200).json({ msg: "USER2 CALLED"})
}

module.exports = { user, user2}