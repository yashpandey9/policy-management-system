const db_config = require("../config/db_config");
const { Sequelize } = require('sequelize');

module.exports = () => new Sequelize(
  db_config.DATABASE,
  db_config.USER,
  db_config.PASSWORD,
  {
    logging: false,
    host: db_config.HOST,
    dialect: db_config.DIALECT
  }
);

