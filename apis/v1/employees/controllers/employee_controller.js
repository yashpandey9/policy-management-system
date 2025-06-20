const { models } = require("../../../../database/models/db_generator");
const { trigger_onboarding_acknowledgement } = require("../services/acknowledgement_scheduler");
const { acknowledge_policy_for_employee } = require("../services/employee_acknowledgement_service");
const { status } = require("../../../../enums/acknowledgement_request")

const create_employee = async (req, res) => {
  try {
    const { name, email, role_id, date_of_joining, customer_company_id } = req.body;

    const employee = await models.employee.create({
      name,
      email,
      role_id,
      date_of_joining,
      customer_company_id,
    });

    await trigger_onboarding_acknowledgement({ employee_id: employee.id });

    res.status(201).json({ status: true, message: "employee_created", data: employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const get_policies_to_acknowledge = async (req, res) => {
  try {
    const employee_id = req.params.id;

    const pending_requests = await models.acknowledgement_request.findAll({
      where: { employee_id, status: status.PENDING },
      include: [models.policy],
    });

    res.status(200).json({
      status: true,
      message: "pending_acknowledgements_fetched",
      data: pending_requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const post_acknowledgement = async (req, res) => {
  try {
    const employee_id = req.params.id;
    const { policy_id, acknowledgement_type } = req.body;

    await acknowledge_policy_for_employee({ employee_id, policy_id, acknowledgement_type });

    res.status(201).json({ status: true, message: "acknowledgement_recorded", data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

  const get_acknowledgement_history = async (req, res) => {
    try {
      const employee_id = req.params.id;

      const history = await models.policy_acknowledgement.findAll({
      where: { employee_id },
      include: [
        {
          model: models.policy,
          as: "policy"
        }
      ]
    });

    res.status(200).json({
      status: true,
      message: "acknowledgement_history_fetched",
      data: history,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

module.exports = {
  create_employee,
  get_policies_to_acknowledge,
  post_acknowledgement,
  get_acknowledgement_history,
};
