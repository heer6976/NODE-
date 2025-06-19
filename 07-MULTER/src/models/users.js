const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email : String,
    age: Number,
});

// const userSchema = new mongoose.Schema({
//     username: {
//         type : String,
//         required : [true ,"Please Provide Unique Username"],
//         unique : [true, "Username Exist"]
//     },
//     password: {
//         type: String,
//         required: [true, "Please provide a Password"],
//         unique: false
//     },
//     email : {
//         type: String,
//         required: [true, "Please provide a unique and valid Email"],
//         unique: [true, "Email Exist"],
//         match: [/\S+@\S+\.\S+/, 'Invalid email format']
//     },
//     age: Number,
// });


const User = mongoose.model("User", userSchema);

module.exports = {User};