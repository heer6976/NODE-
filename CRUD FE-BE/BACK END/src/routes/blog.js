const express = require("express");
const {getBlogs,
    createBlog, 
    getBlog, 
    updateBlog, 
    deleteBlog
} = require("../controllers/blog");
const upload = require("../middleware/uploadFile");
const authToken = require("../middleware/authToken");

const blogRoute = express.Router();

blogRoute.get ("/", authToken ,getBlogs);

blogRoute.post("/", upload.single("image"), createBlog);

blogRoute.get("/:blog_id", getBlog);

blogRoute.delete("/:blog_id", deleteBlog);

blogRoute.put("/:blog_id", upload.single("image"), updateBlog);

module.exports = blogRoute;