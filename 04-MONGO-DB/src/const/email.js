const fs = require("fs")
const path = require("path")


const OTP_EMAIL = {
    SUBJECT: "Forgot Your Password? Use This Code to Reset It",
    HTML1: fs.readFileSync(path.join(__dirname, "..", "..", "public", "html1.text")),
    HTML2: fs.readFileSync(path.join(__dirname, "..", "..", "public", "html2.text"))
}

module.exports = { OTP_EMAIL }