const User = require("../models/users")
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const { sendEmail, getOTP } = require("../utils/email")
const { OTP_EMAIL } = require("../const/email")


const saltRounds = 10;

const getAll = async (req, res) => {
    try {

        console.log(req.session)

        const users = await User.find()

        return res.json({
            data: users
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}

const getOne = async (req, res) => {
    try {

        const userId = req.params["userId"]

        if (!ObjectId.isValid(userId)) return res.json({ msg: "in valid user id" })

        const user = await User.findOne({ _id: userId })

        if (!user) return res.json({ msg: "user not found" })

        return res.json({
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username) return res.json({ msg: "Please enter Username" })
        if (!password) return res.json({ msg: "Please enter Password" })
        if (!email) return res.json({ msg: "Please enter Email" })

        const hashedPwd = bcrypt.hashSync(password, saltRounds)
        await User.create({ username: username, password: hashedPwd, email: email })

        return res.json({
            msg: "User registretion sucessfull"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            error: error
        })
    }
}

const updateOne = async (req, res) => {
    try {

        const userId = req.params["userId"]

        if (!ObjectId.isValid(userId)) return res.json({ msg: "in valid user id" })

        const { firstName, lastName, DOB, gender, phoneNo, address, blogs } = req.body

        const user = await User.findOne({ _id: userId })

        if (!user) return res.json({ msg: "user not found" })

        if (firstName) user.firstName = firstName
        if (lastName) user.lastName = lastName
        if (DOB) user.DOB = DOB
        if (gender) user.gender = gender
        if (phoneNo) user.phoneNo = phoneNo
        if (address) user.address = address

        user.save()

        return res.json({
            msg: "User updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}

const deleteOne = async (req, res) => {
    try {

        const userId = req.params["userId"]

        if (!ObjectId.isValid(userId)) return res.json({ msg: "in valid user id" })

        const doseExist = await User.exists({ _id: userId });

        if (!doseExist) return res.json({ msg: "user not found" })

        await User.deleteOne({ _id: userId })

        return res.json({
            msg: "user delete successfully"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}


const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username) return res.json({ msg: "please enter username" })
        if (!password) return res.json({ msg: "please enter password" })

        const user = await User.findOne({ username: username })

        if (!user) return res.json({ msg: "user not found" })


        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) return res.json({ msg: "password is wrong" })

        req.session.user = {
            id: user._id
        }

        return res.json({
            msg: "login sccessfull"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}

const logout = (req, res) => {
    try {
        return res.json({
            msg: "logout"
        })
    } catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
}

const resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const userId = req.session.user.id

    const user = await User.findById(userId)
    if (!user) return res.json({ msg: "user not found" })


    const isMatch = bcrypt.compareSync(oldPassword, user.password)
    if (!isMatch) return res.json({ msg: "password is wrong" })

    const hashedPwd = bcrypt.hashSync(newPassword, saltRounds)
    user.password = hashedPwd
    await user.save()

    return res.json({ msg: "password updated success fully" })
}

const OTPSTORE = {}

const sendOTP = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email })
    if (!user) return res.json({ msg: "user not found" })

    const OTP = getOTP()

    const msg = OTP_EMAIL.HTML1 + OTP + OTP_EMAIL.HTML2

    await sendEmail(email, OTP_EMAIL.SUBJECT, msg)

    // OTPSTORE[email] = OTP
    OTPSTORE[email] = {OTP: OTP, time: Date.now()}

    return res.json({ msg: "OTP send" })
}

const forgotPassword = async (req, res) => {
    const { email, OTP, password } = req.body;

    const user = await User.findOne({ email: email })
    if (!user) return res.json({ msg: "user not found" })

    if (OTPSTORE[email].OTP !== OTP && (OTPSTORE[email].time + 120000) >= Date.now()) return res.json({ msg: "OTP verification fail" })
    // matchOTP(email, OTP)

    const hashedPwd = bcrypt.hashSync(password, saltRounds)
    user.password = hashedPwd
    await user.save()

    return res.json({ msg: "password updated success fully" })
}

const createBlog = async (req, res) => {
    try {

        const userId = req.params["userId"]

        if (!ObjectId.isValid(userId)) return res.json({ msg: "in valid user id" })

        const { blog } = req.body

        const user = await User.findOne({ _id: userId })

        if (!user) return res.json({ msg: "user not found" })

        user.blogs.push(blog)

        await user.save()

        return res.json({
            msg: "blog created"
        })
    } catch (error) {
        return res.json({
            msg: error
        })
    }
}

const updateBlog = async (req, res) => {
    try {

        const userId = req.params["userId"]

        if (!ObjectId.isValid(userId)) return res.json({ msg: "in valid user id" })

        const { oldBlog, newBlog } = req.body

        const user = await User.findOne({ _id: userId })

        if (!user) return res.json({ msg: "user not found" })

        const oldBlogIndex = user.blogs.indexOf(oldBlog)

        if (oldBlogIndex < 0) return res.json({ msg: "oldBlog Not found" })

        user.blogs.splice(oldBlogIndex, 1, newBlog)

        await user.save()

        return res.json({
            msg: "blog uploaded successfully"
        })
    } catch (error) {
        return res.json({
            msg: error
        })
    }
}

const deleteBlog = async (req, res) => {
    try {

        const userId = req.params["userId"]

        if (!ObjectId.isValid(userId)) return res.json({ msg: "in valid user id" })

        const user = await User.findOne({ _id: userId })

        if (!user) return res.json({ msg: "user not found" })

        const { blog } = req.body

        const blogIndex = user.blogs.indexOf(blog)

        if (blogIndex < 0) return res.json({ msg: "Blog Not found" })

        user.blogs.splice(blogIndex, 1)

        await user.save()

        return res.json({
            msg: "blog deleted successfully"
        })
    } catch (error) {
        return res.json({
            msg: error
        })
    }
}


module.exports = { getAll, getOne, register, updateOne, deleteOne, login, logout, createBlog, updateBlog, deleteBlog, resetPassword, sendOTP, forgotPassword }