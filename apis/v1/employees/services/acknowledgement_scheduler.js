const { models } = require("../../../../database/models/db_generator");
const { request_type, status } = require("../../../../enums/acknowledgement_request")

const trigger_onboarding_acknowledgement = async ({ employee_id }) => {
  const employee = await models.employee.find_by_pk(employee_id);
  const mappings = await models.role_policy_mapping.find_all({ where: { role_id: employee.role_id } });

  const requests = mappings.map((mapping) => ({
    employee_id,
    policy_id: mapping.policy_id,
    request_type: request_type.ON_JOINING,
    request_sent_at: new Date(),
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: status.PENDING,
  }));

  await models.acknowledgement_request.bulk_create(requests);
};

module.exports = {
  trigger_onboarding_acknowledgement,
};