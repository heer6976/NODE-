const transporter = require("../config/emailConfig")

const sendEmail = async (reciver, subject, msg) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: reciver,
        subject: subject,
        html: msg
    };

    await transporter.sendMail(mailOptions)
}

const getOTP = (size = 4) => {

    let OTP = ""

    for (let i = 0; i < size; i++) {
        OTP += Math.round(Math.random() * 10)
    }

    return OTP
}

module.exports = { sendEmail, getOTP }

