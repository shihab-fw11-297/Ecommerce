const express = require("express");
const app = express.Router();
const {
    deleteUser,
    getAllUsers,
    getUser,
    newUser,
  } = require("../controllers/user.js");
const { adminOnly } = require("../middlewares/auth.js");

// route - /api/v1/user/new
app.post("/new", newUser);

// Route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);

// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(deleteUser);

module.exports = app;
