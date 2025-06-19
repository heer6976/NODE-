const express = require("express");
const {getProducts,createProduct, getProduct, updateProduct, deleteProduct
} = require("../controllers/product");
// const authToken = require("../middleware/auth");

const productRoute = express.Router();

productRoute.get ("/", getProducts);

// productRoute.post("/", single("image"), createProduct);

productRoute.post("/",  createProduct);

productRoute.get("/:product_id", getProduct);

productRoute.delete("/:product_id", deleteProduct);

// productRoute.put("/:product_id", single("image"), updateProduct);

productRoute.put("/:product_id",  updateProduct);

module.exports = productRoute;

