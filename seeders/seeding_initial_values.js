// 📦 Seeder: Populate customer_company, user_roles, policy_template

const { sequelize, models } = require("../database/models/db_generator");

async function seedInitialData() {
  try {
    await sequelize.sync({ force: true }); // Caution: This will drop all tables
    console.log("🔄 Database synced (force: true)");

    // 1. Create a Customer Company
    const company = await models.customer_company.create({
      name: "Acme Corp",
      domain: "acme.com"
    });

    // 2. Create Default User Roles
    const roles = await Promise.all([
      models.user_roles.create({
        customer_company_id: company.id,
        name: "Engineering",
        code: "engineering"
      }),
      models.user_roles.create({
        customer_company_id: company.id,
        name: "Finance",
        code: "finance"
      })
    ]);

    // 3. Create Default Policy Templates
    const templates = await Promise.all([
      models.policy_template.create({
        name: "Acceptable Use Policy",
        description: "Employees must use company systems responsibly. [Replaceable: {allowed_tools}]",
        version: "v1",
        is_active: true
      }),
      models.policy_template.create({
        name: "Cryptographic Policy",
        description: "Encryption is required for sensitive data. [Replaceable: {encryption_standard}]",
        version: "v1",
        is_active: true
      })
    ]);

    console.log("✅ Seed data inserted successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedInitialData();
