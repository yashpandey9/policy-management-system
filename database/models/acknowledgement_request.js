module.exports = (sequelize, DataTypes) => {
  const acknowledgement_request = sequelize.define("acknowledgement_request", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  employee_id: DataTypes.BIGINT,
  policy_id: DataTypes.BIGINT,
  request_type: DataTypes.STRING,
  request_sent_at: DataTypes.DATE,
  due_date: DataTypes.DATE,
  status: DataTypes.STRING,
  acknowledged_at: DataTypes.DATE,
  escalated_to: DataTypes.BIGINT,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: false });

  acknowledgement_request.associate = (models) => {
    acknowledgement_request.belongsTo(models.employee, {
      foreignKey: 'employee_id',
      as: 'employee'
    });
    acknowledgement_request.belongsTo(models.policy, {
      foreignKey: 'policy_id',
      as: 'policy'
    });
    acknowledgement_request.belongsTo(models.employee, {
      foreignKey: 'escalated_to',
      as: 'escalated_recipient'
    });
  };

  return acknowledgement_request;
};
