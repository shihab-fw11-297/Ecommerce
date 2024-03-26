const express = require("express");
const app = express.Router();
const { adminOnly } = require("../middlewares/auth.js");
const singleUpload = require("../middlewares/multer.js");
const { getbestProducts,newProduct,getlatestProducts,getAllProducts,getAllCategories,getAdminProducts,getSingleProduct, updateProduct, deleteProduct } = require("../controllers/product.js");

//To Create New Product  - /api/v1/product/new
app.post("/new", singleUpload, newProduct);

//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getlatestProducts);

app.get("/bestProducts", getbestProducts);


//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all Products   - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);

app.route("/:id").get(getSingleProduct).put(singleUpload,updateProduct).delete(deleteProduct);

module.exports = app;