const { modelsDB } = require('../config/db');
const Product = modelsDB.product;


const reduceStock = async (orderItems) => {
  try {
    for (let i = 0; i < orderItems.length; i++) {
      const order = orderItems[i];
      const product = await Product.findByPk(order.prodId || order.id);
      if (!product) {
        throw new Error("Product Not Found");
      }
      product.stock -= order.quantity;
      await product.save();
    }
    console.log("Stock reduced successfully");
  } catch (error) {
    console.error("Error reducing stock:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

module.exports = { reduceStock };
