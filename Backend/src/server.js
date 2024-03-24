const express = require("express");
const {connection} = require("./config/db");
const { config } = require("dotenv");
const { errorMiddleware } = require("./middlewares/error.js");
const userRoute = require("./routes/user.js");
const productRoute = require("./routes/products.js");
const orderRoute = require("./routes/order.js");
const morgan = require('morgan');

const app = express();
app.use(express.json()); 
app.use(morgan("dev"));

config({
    path: "./.env",
  });

const PORT = process.env.PORT || 2000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

app.use(errorMiddleware);

// connectDB();
app.listen(PORT, async function () {
     connection();
    console.log(`listening on port ${PORT}`);
})