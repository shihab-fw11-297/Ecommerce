const { modelsDB } = require('../config/db');
const { TryCatch } = require('../middlewares/error');
const ErrorHandler = require("../utils/errorHandler");
const { rm } = require("fs");
const Product = modelsDB.product;


const newProduct = TryCatch(
    async (req, res, next) => {
        const { name, price, stock, category } = req.body;
        const photo = req.file;

        if (!photo) return next(new ErrorHandler("Please add Photo", 400));

        if (!name || !price || !stock || !category) {
            rm(photo.path, () => {
                console.log("Deleted");
            });

            return next(new ErrorHandler("Please enter All Fields", 400));
        }

        let Products = await Product.create({
            name,
            price,
            stock,
            category: category.toLowerCase(),
            photo: photo.path,
        });

        console.log(Products)
        return res.status(201).json({
            success: true,
            message: "Product Created Successfully",
        });
    }
);

const getlatestProducts = TryCatch(async (req, res, next) => {

    let products = await Product.findAll({
        order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
        limit: 5, // Limit the result to 5 records
    });

    return res.status(200).json({
        success: true,
        products,
    });
});

const getAllProducts = TryCatch(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

});

const getAllCategories = TryCatch(async (req, res, next) => {

});

module.exports = { newProduct, getlatestProducts, getAllProducts, getAllCategories }
