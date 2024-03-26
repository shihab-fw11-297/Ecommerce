const { modelsDB } = require('../config/db');
const { TryCatch } = require('../middlewares/error');
const ErrorHandler = require("../utils/errorHandler");
const Stripe = require("stripe");
const { config } = require("dotenv");
config({ path: "./.env" });

const Coupon = modelsDB.coupan;


const allCoupons = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.findAll({});

    return res.status(200).json({
        success: true,
        coupons,
    });
});


const applyDiscount = TryCatch(async (req, res, next) => {
    const { coupon } = req.query;

    if (coupon == "" || coupon == undefined || coupon == null) return next(new ErrorHandler("Invalid Coupon Code", 400));

    const discount = await Coupon.findOne({
        where: {
            code: coupon
        }
    });

    if (!discount) return next(new ErrorHandler("Invalid Coupon Code", 400));

    return res.status(200).json({
        success: true,
        discount: discount.amount,
    });
});


const createPaymentIntent = TryCatch(async (req, res, next) => {
    const { amount } = req.body;

    if (!amount) return next(new ErrorHandler("Please enter amount", 400));
    const stripe = new Stripe(process.env.STRIPE_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount ,
        currency: "inr",
    });

    return res.status(201).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
    });
});


const deleteCoupon = TryCatch(async (req, res, next) => {
    const { id } = req.params;

    const coupon = await Coupon.findByPk(id);

    if (!coupon) return next(new ErrorHandler("Invalid Coupon ID", 400));

    await Coupon.destroy({
        where: {
            id: id
        }
    });

    return res.status(200).json({
        success: true,
        message: `Coupon ${coupon.code} Deleted Successfully`,
    });
});


const newCoupon = TryCatch(async (req, res, next) => {
    const { coupon, amount } = req.body;

    if (!coupon || !amount)
        return next(new ErrorHandler("Please enter both coupon and amount", 400));

    await Coupon.create({ code: coupon, amount });

    return res.status(201).json({
        success: true,
        message: `Coupon ${coupon} Created Successfully`,
    });
});


module.exports = {
    allCoupons,
    applyDiscount,
    createPaymentIntent,
    deleteCoupon,
    newCoupon
}