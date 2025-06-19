const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//     title : "String",
//     image : "String",
//     content : "String",
//     tags : [],
// },{timestamps : true});

const productSchema = new mongoose.Schema ({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    desc : {
        type : String,
        require : true
    },
    image : {
        type : String,
        default : ""
    },
    tags : [],
}, {timestamps : true});

const Product = mongoose.model("Product",productSchema);

module.exports = Product;