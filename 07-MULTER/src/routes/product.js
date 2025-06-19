const express = require("express");
const {getProducts,
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct
} = require("../controllers/product");
const upload = require("../middleware/uploadFile");
const authToken = require("../middleware/authToken");

const productRoute = express.Router();

productRoute.get ("/", authToken ,getProducts);

productRoute.post("/", upload.single("image"), createProduct);

productRoute.get("/:product_id", getProduct);

productRoute.delete("/:product_id", deleteProduct);

productRoute.put("/:product_id", upload.single("image"), updateProduct);

module.exports = productRoute;