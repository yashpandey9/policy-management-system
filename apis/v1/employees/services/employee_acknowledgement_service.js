const { models } = require("../../../../database/models/db_generator");
const { status } = require("../../../../enums/acknowledgement_request")

const acknowledge_policy_for_employee = async ({ employee_id, policy_id, acknowledgement_type }) => {
  const policy = await models.policy.findByPk(policy_id);

  await Promise.all([
    models.policy_acknowledgement.create({
      employee_id,
      policy_id,
      acknowledgement_type,
      version_acknowledged: policy.version,
      acknowledged_at: new Date(),
    }),
    models.acknowledgement_request.update(
      {
        status: status.ACKNOWLEDGED,
        acknowledged_at: new Date(),
      },
      {
        where: {
          employee_id,
          policy_id,
          status: status.PENDING,
        },
      }
    ),
  ]);
};

module.exports = {
  acknowledge_policy_for_employee,
};
