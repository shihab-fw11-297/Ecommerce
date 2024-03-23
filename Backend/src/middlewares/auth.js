const { modelsDB } = require('../config/db');
const { TryCatch } = require('../middlewares/error');
const ErrorHandler = require("../utils/errorHandler");
const User = modelsDB.users;

// Middleware to make sure only admin is allowed
 const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
  
    if (!id) return next(new ErrorHandler("Please login first", 401));
  
    const user = await User.findOne({
        _id: id
    });
    if (!user) return next(new ErrorHandler("Not allow to access this routes", 401));
    if (user.role !== "admin")
      return next(new ErrorHandler("Not allow to access this routes", 403));
  
    next();
  });


  module.exports = {adminOnly};