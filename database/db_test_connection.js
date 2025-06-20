const { sequelize } = require("./models/db_generator");

const test_database_connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

module.exports = test_database_connection;
