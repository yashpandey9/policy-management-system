// File: src/services/policy_generator_service.js
const { models } = require("../../../../database/models/db_generator");
const { policy_status } = require("../../../../enums/policy");

const create_from_template = async ({ template_id, customer_company_id, config }) => {
  const template = await models.policy_template.find_by_pk(template_id);
  const [policy, _mapping] = await Promise.all([
    models.policy.create({
      customer_company_id,
      template_id,
      name: template.name,
      description: template.description,
      version: template.version,
      status: policy_status.DRAFT,
      is_user_generated: false,
      config,
    }),
    generate_role_policy_mappings(customer_company_id, template_id),
  ]);
  return policy;
};

const create_custom_policy = async ({ customer_company_id, name, description, config }) => {
  return await models.policy.create({
    customer_company_id,
    template_id: null,
    name,
    description,
    version: 1,
    status: policy_status.DRAFT,
    is_user_generated: true,
    config,
  });
};

const update_policy_config = async ({ policy_id, config }) => {
  const policy = await models.policy.find_by_pk(policy_id);
  const new_version = policy.version + 1;
  const updated_policy = await policy.update({ config, version: new_version, status: policy_status.DRAFT });
  return updated_policy;
};

const approve_policy = async ({ policy_id, approved_by, comments }) => {
  const approval = await models.policy_approval.create({
    policy_id,
    approved_by_employee_id: approved_by,
    status: policy_status.APPROVED,
    approved_at: new Date(),
    comments,
  });

  await models.policy.update({ status: policy_status.ACTIVE }, { where: { id: policy_id } });
  return approval;
};

const get_policy_by_id = async (policy_id) => {
  return await models.policy.find_by_pk(policy_id, {
    include: [models.policy_approval, models.policy_acknowledgement],
  });
};

const get_active_policies = async (customer_company_id) => {
  return await models.policy.find_all({
    where: { customer_company_id, status: policy_status.ACTIVE },
  });
};

const generate_role_policy_mappings = async (customer_company_id, template_id) => {
  const roles = await models.user_roles.find_all({ where: { customer_company_id } });
  const policy = await models.policy.find_one({ where: { template_id, customer_company_id } });
  const mappings = roles.map((role) => ({
    customer_company_id,
    role_id: role.id,
    policy_id: policy.id,
  }));
  return models.role_policy_mapping.bulk_create(mappings);
};

module.exports = {
  create_from_template,
  create_custom_policy,
  update_policy_config,
  approve_policy,
  get_policy_by_id,
  get_active_policies,
};