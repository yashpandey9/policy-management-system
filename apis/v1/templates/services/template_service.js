// File: src/services/template_service.js
const { models } = require("../../../../database/models/db_generator");

const fetch_all_templates = async () => {
  return await models.policy_template.find_all({ where: { is_active: true } });
};

const upgrade_template_version = async ({ template_id }) => {
  const template = await models.policy_template.find_by_pk(template_id);
  const new_version = template.version + 1;
  return await template.update({ version: new_version });
};

module.exports = {
  fetch_all_templates,
  upgrade_template_version,
};