const { models } = require("../../../../database/models/db_generator");
const { status } = require("../../../../enums/acknowledgement_request")

const create_manual_acknowledgement_request = async ({ employee_id, policy_id, request_type }) => {
  return await models.acknowledgement_request.create({
    employee_id,
    policy_id,
    request_type,
    request_sent_at: new Date(),
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: status.PENDING,
  });
};

const fetch_pending_acknowledgement_requests = async ({ customer_company_id }) => {
  return await models.acknowledgement_request.find_all({
    where: {
      status: status.PENDING,
      "$employee.customer_company_id$": customer_company_id,
    },
    include: [models.employee, models.policy],
  });
};

const escalate_acknowledgement_request = async ({ request_id, escalated_to }) => {
  return await models.acknowledgement_request.update(
    {
      status: status.ESCALATED,
      escalated_to,
    },
    {
      where: { id: request_id },
    }
  );
};

module.exports = {
  create_manual_acknowledgement_request,
  fetch_pending_acknowledgement_requests,
  escalate_acknowledgement_request,
};