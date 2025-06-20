module.exports = (sequelize, DataTypes) => {
  const policy_template = sequelize.define("policy_template", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  version: DataTypes.STRING,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: true, createdAt: 'created_at', updatedAt: false });

  return policy_template;
};
