const { TryCatch } = require('../middlewares/error');
const { modelsDB } = require('../config/db');
const { reduceStock } = require("../utils/features.js");
const ErrorHandler = require("../utils/errorHandler");

const Order = modelsDB.order;
const User = modelsDB.users;


const myOrders = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    const orders = await Order.findOne({
        where: {
            user: id
        }
    });

    return res.status(200).json({
        success: true,
        orders,
    });
});

const allOrders = TryCatch(async (req, res, next) => {
    const orders = await Order.findAll({
        include: [
            {
                model: User,
                as: `userInfo`
            }
        ]
    });

    return res.status(200).json({
        success: true,
        orders,
    });

});

const getSingleOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    let orders = await Order.findByPk(id);

    if (!orders) return next(new ErrorHandler("Order Not Found", 404));

    return res.status(200).json({
        success: true,
        orders,
    });
});


const newOrder = TryCatch(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
    } = req.body;

    if (!shippingInfo || !orderItems || !user || !subtotal || !tax || !total)
        return next(new ErrorHandler("Please Enter All Fields", 400));

    let Orders = await Order.create({
        shippingInfo,
        orderItems,
        user,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
    });

    await reduceStock(orderItems);

    return res.status(201).json({
        success: true,
        message: "Order Placed Successfully",
    });
});

const processOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    let orders = await Order.findByPk(id);
    let status = null;
    if (!orders) return next(new ErrorHandler("Order Not Found", 404));

    switch (orders.status) {
        case "Processing":
            status = "Shipped";
            break;
        case "Shipped":
            status = "Delivered";
            break;
        default:
            status = "Delivered";
            break;
    }

    await Order.update({ status: status }, {
        where: { id: id },
        returning: true, // Include this option to return the updated record
    });

    return res.status(200).json({
        success: true,
        message: "Order Processed Successfully",
    });

});

const deleteOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    let orders = await Order.findByPk(id);

    if (!orders) return next(new ErrorHandler("Order Not Found", 404));

    await orders.destroy({
        where: {
            id: id
        }
    });

    return res.status(200).json({
        success: true,
        message: "Order Deleted Successfully",
    });
});

module.exports = { newOrder, myOrders, allOrders, getSingleOrder, processOrder, deleteOrder }