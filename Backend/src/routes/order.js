const express = require("express");
const app = express.Router();
const { adminOnly } = require("../middlewares/auth.js");
const { newOrder, myOrders,allOrders,getSingleOrder,processOrder,deleteOrder } = require("../controllers/order.js");

// route - /api/v1/order/new
app.post("/new", newOrder);

// route - /api/v1/order/my
app.get("/my", myOrders);

// route - /api/v1/order/my
app.get("/all", allOrders);

app.route("/:id")
    .get(getSingleOrder)
    .put(processOrder)
    .delete(deleteOrder);

module.exports = app;
