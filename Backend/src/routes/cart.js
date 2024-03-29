const express = require("express");
const app = express.Router();
const { addCart,myCart,updateCart,deleteCart } = require("../controllers/cart.js");

// route - /api/v1/order/new
app.post("/add", addCart);

// route - /api/v1/order/my
app.get("/my/:id", myCart);

app.route("/:id")
    .put(updateCart)
    .delete(deleteCart);

module.exports = app;
