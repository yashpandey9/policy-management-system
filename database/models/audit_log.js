module.exports = (sequelize, DataTypes) => {
  const audit_log = sequelize.define("audit_log", {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  entity_type: DataTypes.STRING,
  entity_id: DataTypes.INTEGER,
  action: DataTypes.STRING,
  performed_by: DataTypes.INTEGER,
  details: DataTypes.JSON,
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { underscored: true, timestamps: true, createdAt: 'created_at', updatedAt: false });

  return audit_log;
};
