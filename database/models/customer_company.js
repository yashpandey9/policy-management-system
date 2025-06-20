module.exports = (sequelize, DataTypes) => {
  const customer_company = sequelize.define("customer_company", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  domain: DataTypes.STRING,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: true, createdAt: 'created_at', updatedAt: false });

  return customer_company;
};
