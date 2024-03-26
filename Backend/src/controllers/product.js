const { modelsDB } = require('../config/db');
const { TryCatch } = require('../middlewares/error');
const ErrorHandler = require("../utils/errorHandler");
const { rm } = require("fs");
const Product = modelsDB.product;
const sequelize = modelsDB.sequelize;
const { Op } = require('sequelize');
const myCache = require('../server');
const { deleteCache, storeCache, findCacheData, storeListCache } = require('../config/cache');
const { faker } = require('@faker-js/faker');

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

        deleteCache(`latest-products`)
        deleteCache(`getAdminProducts`)
        deleteCache(`categories`)

        return res.status(201).json({
            success: true,
            message: "Product Created Successfully",
        });
    }
);



const getbestProducts = TryCatch(async (req, res, next) => {
    let products;

    // let cachedData = await findCacheData(`latest-products`)

    // if (cachedData) {
    //     products = JSON.parse(cachedData);
    // } else {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const offset = (page - 1) * limit;


        products = await Product.findAll({
            order: [['createdAt', 'ASC']], // Sort by createdAt in descending order
            limit: limit,
            offset: offset
        });
    //     storeCache(`latest-products`, products);
    // }

    const totalCount = await Product.count({ });
    const totalPages = Math.ceil(totalCount / limit);


    return res.status(200).json({
        success: true,
        products,
        totalPage: totalPages,
        limit:req.query.limit
    });
});

const getlatestProducts = TryCatch(async (req, res, next) => {
    let products;

    // let cachedData = await findCacheData(`latest-products`)

    // if (cachedData) {
    //     products = JSON.parse(cachedData);
    // } else {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const offset = (page - 1) * limit;


        products = await Product.findAll({
            order: [['createdAt', 'DESC']], // Sort by createdAt in descending order
            limit: limit,
            offset: offset
        });
    //     storeCache(`latest-products`, products);
    // }

    const totalCount = await Product.count({ });
    const totalPages = Math.ceil(totalCount / limit);


    return res.status(200).json({
        success: true,
        products,
        totalPage: totalPages,
        limit:req.query.limit
    });
});

const getAllProducts = TryCatch(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    const whereConditions = {};

    if (search) {
        whereConditions.name = {
            [Op.iLike]: `%${search}%`
        };
    }

    if (price) {
        whereConditions.price = {
            [Op.lte]: price
        };
    }

    if (category) {
        whereConditions.category = category;
    }

    try {
        const products = await Product.findAll({
            where: whereConditions,
            order: sort ? [['price', sort === 'asc' ? 'ASC' : 'DESC']] : [],
            limit: limit,
            offset: offset
        });

        const totalCount = await Product.count({ where: whereConditions });
        const totalPages = Math.ceil(totalCount / limit);

        return res.status(200).json({
            success: true,
            products: products,
            totalPage: totalPages,
            limit:req.query.limit
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});


const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;

    let cachedData = await findCacheData(`getAdminProducts`)

    if (cachedData) {
        products = JSON.parse(cachedData);
    } else {
        products = await Product.findAll({});
        storeCache(`getAdminProducts`, products);
    }
    return res.status(200).json({
        success: true,
        products,
    });

});

const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    let cachedData = await findCacheData(`product-${id}`)
    let products;

    if (cachedData) {
        products = JSON.parse(cachedData);
    } else {
        products = await Product.findByPk(id);
        storeCache(`product-${id}`, products);
    }
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

    deleteCache(`product-${id}`)
    deleteCache(`latest-products`)
    deleteCache(`getAdminProducts`)
    deleteCache(`categories`)

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
    deleteCache(`product-${id}`)
    deleteCache(`latest-products`)
    deleteCache(`getAdminProducts`)
    deleteCache(`categories`)
    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully"
    });
});

const getAllCategories = TryCatch(async (req, res, next) => {
    let cachedData = await findCacheData(`categories`)
    let categories;

    if (cachedData) {
        categories = JSON.parse(cachedData);
    } else {
        categories = await Product.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('category')), 'category']
            ]
        });
        categories = categories.map(category => category.category);
        storeCache(`categories`, categories);
    }
    return res.status(200).json({
        success: true,
        categories,
    });
});

const generateRandomProducts = async (count = 10) => {
    const products = [];

    for (let i = 0; i < count; i++) {
      const product = {
        name: faker.commerce.productName(),
        photo: faker.image.urlLoremFlickr({ category: faker.commerce.department() }),
        price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
        stock: faker.datatype.number({ min: 0, max: 100 }),
        category: faker.commerce.department(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      products.push(product);
    }

    try {
      await Product.bulkCreate(products);
      console.log({ success: true });
    } catch (error) {
      console.error('Error generating products:', error);
    }
  };


//   generateRandomProducts(20)


module.exports = { getbestProducts,newProduct, getlatestProducts, getAllProducts, getAllCategories, getAdminProducts, getSingleProduct, deleteProduct, updateProduct }
