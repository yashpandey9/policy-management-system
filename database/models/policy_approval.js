module.exports = (sequelize, DataTypes) => {
  const policy_approval = sequelize.define("policy_approval", {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    policy_id: DataTypes.BIGINT,
    approved_by_employee_id: DataTypes.BIGINT,
    status: DataTypes.STRING,
    approved_at: DataTypes.DATE,
    comments: DataTypes.TEXT,
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: false });

  policy_approval.associate = (models) => {
      policy_approval.belongsTo(models.policy, {
        foreignKey: 'policy_id',
        as: 'policy'
      });
      policy_approval.belongsTo(models.employee, {
        foreignKey: 'approved_by_employee_id',
        as: 'approver'
      });
  };

  return policy_approval;
};
