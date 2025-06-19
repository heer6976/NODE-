const mongoose = require ("mongoose")

// trim & lower case
 
 const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        required: true,
    },

    // desc : {
    //     type: String,
    //     // required: true,
    // },

    // image:{
    //     type: String,
    //     default: ""
    // },

    // rating: {
    //     type: Number,
    //     enum: [0, 1, 2, 3, 4, 5],
    //     default: 0    
    // },

    // tags: [String],
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },

    // stock: {type: Number, default:0},

    // purchased: {type: Number, default: 0},

    // discount: {type: Number,default:0}

 })

 const Product = mongoose.model("Product", productSchema)

 module.exports = Product