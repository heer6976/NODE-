const Blog = require("../models/blog");
const fs = require("fs");
const path = require("path");


// To Get All Blogs
const getBlogs = async (req,res) => {
    const allBlogs = await Blog.find();

    res.json({
        blogs : allBlogs,
    });
};



// To Create Blogs
const createBlog = (req,res) => {
    let image = ""
    if(req.file?.filename){
        image = req.file.filename;
    }
    
    const {title,content,tags} = req.body;

    Blog.create({title,content,tags, image});

    res.json({
        msg : "Blog is Created",
    });
};



// To Get A Single Blog
const getBlog = async (req,res) => {
    try{
        const blog_id = req.params["blog_id"];

        const blog = await Blog.findOne({ _id : blog_id});

        if(!blog){
            return res.status(404).json({
                msg : "This Blog does not exist.",
            });
        } else {
            return res.status(200).json({
                blog : blog,
            });
        }
    } catch (error) {
        console.log(error);
        res.status.json({
            msg : "Internal Server Error.",
            error : error,
        });
    };
};


// To Update a Blog
const updateBlog = async (req,res) => {
    try {
        const blog_id = req.params["blog_id"];
        const blog_data = req.body;
        const blog = await Blog.findOne({ _id : blog_id});

        if(!blog) {
            return res.status(404).json({
                msg : "This Blog does not exist.",
            });
        } else {
            if (blog_data["title"]) {
                blog["title"] = blog_data["title"];
            }

            if (blog_data["content"]) {
                blog["content"] = blog_data["content"];
            }

            if(req.file && req.file.filename) {
                const oldFileName = blog["image"];

                if(oldFileName !== "") {
                    const oldFilePath = path.join(__dirname, "..", "..", "public", "images", oldFileName);
                    fs.unlinkSync(oldFilePath);
                }

              blog["image"] = req.file.filename;
            }

            if(blog_data["tags"]) {
                const index =  blog.tags.indexOf(blog_data.tags.old);
                blog.tags.set(index, blog_data.tags.new);
            }

            blog.save();


            return res.status(202).json({
                msg : "Blog Updated",
            });
        }
    } catch (error) {
        res.status(500).json({
            msg : "Internal Server Error",
            error : error,
        });
        console.log(error);
    };
};

// To Delete a Blog
const deleteBlog = async (req,res) => {
    try {
        const blog_id = req.params["blog_id"];

        const blog = await Blog.findById(blog_id);

        if(!blog) {
            return res.status(404).json({
                msg : "Blog does not exist.",
            });
        } else {
            const fileName = blog["image"];

            if(fileName !== "") {
                const filePath = path.join(__dirname, "..", "..", "public", "images", fileName);
                fs.unlinkSync(filePath);
            };

            await Blog.deleteOne({ _id : blog_id});

            return res.status(202).json({
                msg : "Blog Removed",
            });
        }
    } catch(error) {
        res.status(500).json({
            msg : "Internal Server Error.",
            error : error,
        });
    }
};

module.exports = {getBlogs,createBlog, getBlog, updateBlog, deleteBlog};