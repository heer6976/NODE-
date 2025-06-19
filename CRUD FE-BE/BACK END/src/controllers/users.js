const {User} = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {sendEmail} = require("../config/email_config");
const {OTP_DATA} = require("../config/email_temp");

// For getting data

const getUsers = async (req,res) => {

    const allUsers = await User.find();

    res.status(200).json({
        users : allUsers,
    });
}

// For getting single data

const getUser = async (req,res) => {
    const user_id = req.params["user_id"];

    const singleUser = await User.findOne({ _id: user_id});

    if (!singleUser) {
        return res.status(404).json({
            msg : "user is not exist",
        });
    }
    else {
        return res.status(200).json({
            user : singleUser,
        });
    };
}

// For create user
const soltValue = bcrypt.genSaltSync();

const createUser = async (req, res) => {
    try {
        const {username , password,email, ...userData} = req.body;
        const age = userData["age"] || null
        const hashPassword = bcrypt.hashSync(password, soltValue)
        await User.create({ username: username, password: hashPassword, age: age});

        res.status(201).json({
            msg:"user added",
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg:"intrnal server error",
            error:error,
        });
    }
};

// For update user

const updateUser = async (req,res) => {
    const user_id = req.params["user_id"];

    const user_data = req.body;

    const singleUser = await User.findOne({ _id: user_id});

    if (!singleUser) {
        return res.status(404).json({
            msg : "User is Not Exist",
        });
    } else {
        if (user_data["username"]) {
            singleUser["username"] = user_data["username"];
        }

        if (user_data["password"]) {
            singleUser["password"] = user_data["password"];
        }

        if (user_data["age"]) {
            singleUser["age"] = user_data["age"];
        }

        singleUser.save();

        return res.status(202).json({
            msg : "User's Data has been Updated Successfully"
        });
    };
}

// For delete data

const deleteUser = async (req,res) => {

    const user_id = req.params["user_id"];

    const singleUser = await User.findById(user_id);

    if (!singleUser) {
        return res.status(404).json({
            msg : "user is not exist",
        });
    }
    else {
        await User.deleteOne({ _id: user_id});
        return res.status(202).json({
            msg : "User is Removed Successfully",
        });
    };
};


const loginUser = async (req,res) => {
    const {username,password} = req.body;

    if(!username) return res.json({msg: "Please Enter UserName"});

    if(!password) return res.json({msg: "Please Enter Password"});

    const user = await User.findOne({username});

    if(!user) return res.json({msg: "User not Found"});

    const isValidPass = bcrypt.compareSync(password, user.password)

    if(!isValidPass) return res.json ({msg: "Password is wrong"});


    // Auth Token : [Example] - afdgafdgg145sg4weg44qe54ga54fa5g4sg4dgdsget0ef0ddf

    const token = jwt.sign({ data: user._id, user: user.username}, "privateKey");

    res.json({
        token: token,
        msg: "User Logged in Successfully",
    });
};


const otp_data = {}

const generateOTP = async (req, res) => {

    try {
        const to = req.body["email"]
        const username = req.body["username"]

        const user = await User.findOne({ username: username })
        if (!user) {
            return res.json({
                msg: "user not found"
            })
        } else {
            let subject = OTP_DATA["OTP_SUBJECT"];
            let html_1 = OTP_DATA["OTP_HTML_1"];
            let html_2 = OTP_DATA["OTP_HTML_2"];

            let otp = Math.round(Math.random() * 9000);

            otp_data[to] = { otp: otp, time: Date.now() };

            let html = `${html_1} ${otp} ${html_2}`

            sendEmail(to, subject, html)

            console.log(otp_data)
            return res.json({
                msg: "otp send"
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            "msg": "Error in generating OTP"
        })
    }
}


module.exports = {
    getUser, 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    loginUser,
    generateOTP,
}