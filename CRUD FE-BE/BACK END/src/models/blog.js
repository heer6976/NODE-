const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title : "String",
    image : "String",
    content : "String",
    tags : [],
},{timestamps : true});

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;