module.exports = (sequelize, DataTypes) => {
  const policy_acknowledgement = sequelize.define("policy_acknowledgement", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  employee_id: DataTypes.BIGINT,
  policy_id: DataTypes.BIGINT,
  acknowledged_at: DataTypes.DATE,
  acknowledgement_type: DataTypes.STRING, 
  version_acknowledged: DataTypes.STRING,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: true, createdAt: 'created_at', updatedAt: false });

  policy_acknowledgement.associate = (models) => {
      policy_acknowledgement.belongsTo(models.employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });
      policy_acknowledgement.belongsTo(models.policy, {
        foreignKey: 'policy_id',
        as: 'policy'
      });
  };

  return policy_acknowledgement;
};
