const mongoose = require('mongoose');

const connectDB = async () => {
    const mongConnection = await mongoose.connect(process.env.MONGO_URL, {autoIndex: false})
    if (mongConnection) {
        console.log("DB conneciton success")
    } else {
        console.log("DB connection Fail")
    }
}

module.exports = connectDB