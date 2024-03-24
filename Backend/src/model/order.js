const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shippingInfo: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tax: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        shippingCharges: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered'),
            defaultValue: 'Processing',
            allowNull: false,
        },
        orderItems: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false,
        }
    }, {
        timestamps: true,
    });

    return Order;
};
