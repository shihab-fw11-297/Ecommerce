const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
    const Coupon = sequelize.define('Coupon', {
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notNull: {
              msg: 'Please enter the Coupon Code'
            }
          }
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'Please enter the Discount Amount'
            }
          }
        }
      });

    return Coupon;
};
