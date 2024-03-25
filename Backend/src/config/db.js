const { Sequelize, DataTypes } = require('sequelize');
const { config } = require("dotenv");
config({
    path: "./.env",
  });

const db = process.env.DBURL;
console.log(db)
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
modelsDB.order = require("../model/order")(sequelize, DataTypes);
modelsDB.coupan = require("../model/coupan")(sequelize, DataTypes);



modelsDB.order.belongsTo(modelsDB.users,{foreignKey:`user`, as:`userInfo`});

modelsDB.sequelize.sync({ force: false }).then(() => {
    console.log("DONE");
});

module.exports = { connection, modelsDB };
