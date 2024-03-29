const { TryCatch } = require('../middlewares/error');
const { modelsDB } = require('../config/db');
const Cart = modelsDB.cart;

const addCart = TryCatch(async (req, res, next) => {
    const { userId, prodId, price, name, photo, stock, quantity } = req.body;

    const cartItem = await Cart.create({
        userId,
        prodId,
        price,
        name,
        photo,
        stock,
        quantity
    });

    res.status(201).json(cartItem);
});

const myCart = TryCatch(async (req, res, next) => {
    const userId = req.params.id;

    const cartList = await Cart.findAll({
        where: {
            userId: userId
        }
    });

    res.json(cartList);
});

const updateCart = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { price, name, photo, stock, quantity } = req.body;

    const cartItem = await Cart.findOne({
        where: {
            id: id
        }
    });

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.price = price;
    cartItem.name = name;
    cartItem.photo = photo;
    cartItem.stock = stock;
    cartItem.quantity = quantity;

    await cartItem.save();

    res.json(cartItem);
});


const deleteCart = TryCatch(async (req, res, next) => {
    const { id} = req.params;

    console.log("id",id)
    const cartItem = await Cart.findOne({
        where: {
            prodId: id
        }
    });

    if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItem.destroy();

    res.json({ message: 'Cart item deleted successfully' });
});

module.exports = { addCart, myCart, updateCart, deleteCart }