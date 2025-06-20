
module.exports = (sequelize, DataTypes) => {
  const policy = sequelize.define("policy", {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    customer_company_id: DataTypes.BIGINT,
    template_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    version: DataTypes.STRING,
    status: DataTypes.STRING,
    is_user_generated: DataTypes.BOOLEAN,
    config: DataTypes.JSON,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  policy.associate = (models) => {
      policy.belongsTo(models.customer_company, {
        foreignKey: 'customer_company_id',
        as: 'company'
      });
      policy.belongsTo(models.policy_template, {
        foreignKey: 'template_id',
        as: 'template'
      });
  };

  return policy;
};
