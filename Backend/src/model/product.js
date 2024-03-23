const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, // Ensures the field is not empty
            },
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isDecimal: true, // Validates that the value is a decimal INTEGER
                min: 0, // Validates that the value is greater than or equal to 0
            },
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true, // Validates that the value is an integer
                min: 0,
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notEmpty: true,
            },
        },
    }, {
        timestamps: true,
    });

    return Product;
}