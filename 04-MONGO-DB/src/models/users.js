const mongoose = require('mongoose');
const { GENDERS } = require("../const/users")

// structure (schema) : name, password, email, phone
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        minLength: 4,
        // match: /^[a-zA-Z0-9._]{4,}$/
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: true,
        // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    DOB: {
        type: Date,
        default: null
    },
    gender: {
        type: Number,
        enum: [GENDERS.MALE, GENDERS.FEMALE, GENDERS.OTHERS]
    },
    phoneNo: {
        type: Number,
        default: null,
        validate: {
            validator: (pNo) => {
                return true
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        code: Number
    },
    blogs: [String],
})

//  Model(collection mongodb) <= schema
const User = mongoose.model("User", userSchema)

module.exports = User