const nodemailer  = require ("nodemailer")

const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "smitupadhyay22@gmail.com",
            pass : "zqibchbcukdijcxn",
        }
    }
)

const sendEmail = (to, subject, html) => {
    console.log("==================="),
    transporter.sendMail({
        from : "smitupadhyay22@gmail.com",
        to : to,
        subject : subject,
        html : html
    })
}

module.exports = {sendEmail}