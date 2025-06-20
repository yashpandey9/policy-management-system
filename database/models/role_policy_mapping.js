module.exports = (sequelize, DataTypes) => {
  const role_policy_mapping = sequelize.define("role_policy_mapping", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  customer_company_id: DataTypes.BIGINT,
  role_id: DataTypes.BIGINT,
  policy_id: DataTypes.BIGINT,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: false });
  role_policy_mapping.associate = (models) => {
    role_policy_mapping.belongsTo(models.customer_company, {
      foreignKey: 'customer_company_id',
      as: 'company'
    });
    role_policy_mapping.belongsTo(models.user_roles, {
      foreignKey: 'role_id',
      as: 'role'
    });
    role_policy_mapping.belongsTo(models.policy, {
      foreignKey: 'policy_id',
      as: 'policy'
    });
  };

  return role_policy_mapping;
};
