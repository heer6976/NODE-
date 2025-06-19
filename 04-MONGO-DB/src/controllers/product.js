const Product = require("../models/products");
const fs = require("fs");
const path = require("path");
const { deleteImage } = require("../utils/image");


// To Get All Products
const getProducts = async (req,res) => {
    console.log("run")
    const allproducts = await Product.find();

    res.json({
        products : allproducts,
    });
};

// To Create Products
const createProduct = (req,res) => {
    
    const {name,price} = req.body;

    Product.create({name,price});

    res.json({
        msg : "Product is Created",
    });
};


// To Get A Single Product
const getProduct = async (req,res) => {
    try{
        const product_id = req.params["product_id"];

        const product = await Product.findOne({ _id : product_id});

        if(!product){
            return res.status(404).json({
                msg : "This product does not exist.",
            });
        } else {
            return res.status(200).json({
                product : product,
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


// To Update a Product
const updateProduct = async (req,res) => {
    try {
        const { name, price, desc, tags } = req.body

        const productId = req.params["productId"]

        if (!isObjectIdOrHexString.isValid(productId)) return res.json({ msg: "invalid Product id"})

            const product = await Product.findOne({
                _id: productId
            })
            if(!product) return res.json({ msg: "Product not found" })

                let image = product.image
                if(req.file?.filename){
                    image = req.file.filename
                }
                await Product.findByIdAndUpdate(productId, { name, price, desc, tags, image})

                return res.json({
                    msg : "Product Updated"
                })
    }catch (error) {
        console.log(error)
        return res.json({
            msg: error
        })
    }
    }
//         const product_id = req.params["product_id"];
//         const product_"data = req.body;
//         const product = await Product.findOne({ _id : product_id})

//         if(!product) {
//             return res.status(404).json({
//                 msg : "This Product does not exist.",
//             });
//         } else {
//             if (product_data["name"]) {
//                 product["name"] = product_data["name"];
//             }

//             if (product_data["price"]) {
//                 product["price"] = product_data["price"];
//             }

//             if(req.file && req.file.filename) {
//                 const oldFileName = product["image"];

//                 if(oldFileName !== "") {
//                     const oldFilePath = path.join(__dirname, "..", "..", "public", "images", oldFileName);
//                     fs.unlinkSync(oldFilePath);
//                 }

//               product["image"] = req.file.filename;
//             }

//             if(product_data["tags"]) {
//                 const index =  product.tags.indexOf(product_data.tags.old);
//                 product.tags.set(index, product_data.tags.new);
//             }

//             product.save();


//             return res.status(202).json({
//                 msg : "Product Updated",
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             msg : "Internal Server Error",
//             error : error,
//         });
//         console.log(error);
//     };
// };

// To Delete a Product
const deleteProduct = async (req,res) => {
    try {
        const product_id = req.params["product_id"];

        if(!isObjectId.isValid(productId)) return res.json({ msg: "invalid Product id"})

            const product = await Product.findOne({
                _id: productId
            })

            if(!product) return res.json({ msg:  "Product not found"})

                if(product.image) {
                    deleteImage(product.image)
                }

                await Product.deleteProduct({
                    _id: productId
                })

                return res.json({
                    msg: "Product Deleted Successfully"
                })

            }catch (error) {
                console.log(error)
                return res.json({
                    msg: error
                })
            }
        }

    //     const product = await Product.findById(product_id);

    //     if(!product) {
    //         return res.status(404).json({
    //             msg : "Product does not exist.",
    //         });
    //     } else {
    //         const fileName = product["image"];

    //         if(fileName !== "") {
    //             const filePath = path.join(__dirname, "..", "..", "public", "images", fileName);
    //             fs.unlinkSync(filePath);
    //         };

    //         await Product.deleteOne({ _id : product_id});

    //         return res.status(202).json({
    //             msg : "Product Removed",
    //         });
    //     }
    // } catch(error) {
    //     res.status(500).json({
    //         msg : "Internal Server Error.",
    //         error : error,

module.exports = {getProducts,createProduct, getProduct, updateProduct, deleteProduct};