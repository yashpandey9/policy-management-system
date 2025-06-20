const {
  create_manual_acknowledgement_request,
  fetch_pending_acknowledgement_requests,
  escalate_acknowledgement_request,
} = require("../services/acknowledgement_request_service");

const post_acknowledgement_request = async (req, res) => {
  try {
    const { employee_id, policy_id, request_type } = req.body;
    const request = await create_manual_acknowledgement_request({ employee_id, policy_id, request_type });

    res.status(201).json({ status: true, message: "acknowledgement_request_created", data: request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const get_pending_acknowledgement_requests = async (req, res) => {
  try {
    const { customer_company_id } = req.query;
    const pending_requests = await fetch_pending_acknowledgement_requests({ customer_company_id });

    res.status(200).json({ status: true, message: "pending_requests_fetched", data: pending_requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const patch_escalate_acknowledgement_request = async (req, res) => {
  try {
    const request_id = req.params.id;
    const { escalated_to } = req.body;

    await escalate_acknowledgement_request({ request_id, escalated_to });

    res.status(200).json({ status: true, message: "acknowledgement_request_escalated", data: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

module.exports = {
  post_acknowledgement_request,
  get_pending_acknowledgement_requests,
  patch_escalate_acknowledgement_request,
};