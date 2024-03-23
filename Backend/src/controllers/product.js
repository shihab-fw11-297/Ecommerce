const { modelsDB } = require('../config/db');
const { TryCatch } = require('../middlewares/error');
const ErrorHandler = require("../utils/errorHandler");
const { rm } = require("fs");
const Product = modelsDB.product;
const sequelize = modelsDB.sequelize;


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


const getAdminProducts = TryCatch(async (req, res, next) => {
    let products = await Product.findAll({});

    return res.status(200).json({
        success: true,
        products,
    });

});

const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    let products = await Product.findByPk(id);

    return res.status(200).json({
        success: true,
        products,
    });

});

const deleteProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    let products = await Product.findByPk(id);

    if (!products) return next(new ErrorHandler("Product Not Found", 404));

    rm(products.photo, () => {
        console.log("Product Photo Deleted");
    });

    await products.destroy({
        where: {
            id: id
        }
    });

    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});

const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findByPk(id);
    let updatedFields = {};
    
    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    if (photo) {
        rm(product.photo, () => {
            console.log("Old Photo Deleted");
        });
        updatedFields.photo = photo.path;
    }

    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (stock) updatedFields.stock = stock;
    if (category) updatedFields.category = category;
  
     await Product.update(updatedFields, {
        where: { id: id },
        returning: true, // Include this option to return the updated record
      });
    
    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully"
    });
});

const getAllCategories = TryCatch(async (req, res, next) => {

    const categories = await Product.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('category')), 'category']
        ]
    });
    const distinctCategories = categories.map(category => category.category);

    return res.status(200).json({
        success: true,
        distinctCategories,
    });
});

module.exports = { newProduct, getlatestProducts, getAllProducts, getAllCategories, getAdminProducts, getSingleProduct, deleteProduct, updateProduct }
