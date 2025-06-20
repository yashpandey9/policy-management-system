module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define("user_roles", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    customer_company_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    underscored: true,
    timestamps: false
  });

  user_roles.associate = (models) => {
    user_roles.belongsTo(models.customer_company, {
      foreignKey: 'customer_company_id',
      as: 'company'
    });
  };

  return user_roles;
};
