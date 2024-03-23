const { Sequelize, DataTypes } = require('sequelize');

const db = 'postgresql://Ecommerce_owner:9Wvxyb6IDfaJ@ep-broad-star-a5ofarwh.us-east-2.aws.neon.tech/ecommerce?sslmode=require';
//const sequelize = new Sequelize({ dialect: 'sqlite', storage: db });
const sequelize = new Sequelize(db, { logging: false });

async function connection() {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
}

const modelsDB = {};
modelsDB.Sequelize = Sequelize;
modelsDB.sequelize = sequelize;

modelsDB.users = require("../model/user")(sequelize, DataTypes);
modelsDB.product = require("../model/product")(sequelize, DataTypes);


modelsDB.sequelize.sync({ force: false }).then(() => {
    console.log("DONE");
});

module.exports = { connection, modelsDB };
