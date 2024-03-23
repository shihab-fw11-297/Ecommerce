const express = require("express");
const app = express.Router();
const { adminOnly } = require("../middlewares/auth.js");
const singleUpload = require("../middlewares/multer.js");
const { newProduct,getlatestProducts,getAllProducts,getAllCategories } = require("../controllers/product.js");

//To Create New Product  - /api/v1/product/new
app.post("/new", singleUpload, newProduct);

//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getlatestProducts);

//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

module.exports = app;