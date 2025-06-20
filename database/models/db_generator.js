const getSequelize = require('../db_connection_initializer');
const sequelize = getSequelize();
const { DataTypes } = require('sequelize');
const defineModel = require('./index');

const db_generator = (sequelizeInstance) => {
  return defineModel(sequelizeInstance, DataTypes);
};

const models = db_generator(sequelize); // ✅ Define models first

module.exports = {
  sequelize,
  models,
  db_generator
};
