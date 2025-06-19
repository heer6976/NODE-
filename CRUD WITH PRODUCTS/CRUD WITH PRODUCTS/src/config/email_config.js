const nodemailer  = require ("nodemailer")

const transporter = nodemailer.createTransport(
    {
        service : "gmail",
        auth : {
            user : "sorathiyaheer7@gmail.com",
            pass : "zqibchbcukdijcxn",
        }
    }
)

const sendEmail = (to, subject, html) => {
    console.log("==================="),
    transporter.sendMail({
        from : "sorathiyaheer7@gmail.com",
        to : to,
        subject : subject,
        html : html
    })
}

module.exports = {sendEmail}