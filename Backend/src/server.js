const express = require("express");
const {connection} = require("./config/db");
const dotenv = require("dotenv");
const { errorMiddleware } = require("./middlewares/error.js");
const userRoute = require("./routes/user.js");
const productRoute = require("./routes/products.js");

dotenv.config();

const app = express();
app.use(express.json()); 
const PORT = 5000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use(errorMiddleware);

// connectDB();
app.listen(PORT, async function () {
     connection();
    console.log(`listening on port ${PORT}`);
})