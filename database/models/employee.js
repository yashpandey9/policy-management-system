module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define("employee", {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    customer_company_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role_id: DataTypes.BIGINT,
    date_of_joining: DataTypes.DATE,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  employee.associate = (models) => {
    employee.belongsTo(models.customer_company, {
      foreignKey: 'customer_company_id',
      as: 'company'
    });
    employee.belongsTo(models.user_roles, {
      foreignKey: 'role_id',
      as: 'role'
    });
  };

  return employee;
};
