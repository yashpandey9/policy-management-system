// File: src/controllers/policy_controller.js
const { 
  create_from_template, 
  create_custom_policy, 
  update_policy_config,
  approve_policy,
  get_policy_by_id,
  get_active_policies
} = require("../services/policy_generator_service");

const create_policy_from_template = async (req, res) => {
  try {
    const { template_id, customer_company_id, config } = req.body;
    const policy = await create_from_template({ template_id, customer_company_id, config });
    res.status(201).json({ status: true, message: "policy_created", data: policy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const create_policy_custom = async (req, res) => {
  try {
    const { customer_company_id, name, description, config } = req.body;
    const policy = await create_custom_policy({ customer_company_id, name, description, config });
    res.status(201).json({ status: true, message: "custom_policy_created", data: policy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const patch_policy_config = async (req, res) => {
  try {
    const policy_id = req.params.id;
    const { config } = req.body;
    const policy = await update_policy_config({ policy_id, config });
    res.status(200).json({ status: true, message: "policy_config_updated", data: policy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const post_policy_approval = async (req, res) => {
  try {
    const policy_id = req.params.id;
    const { approved_by, comments } = req.body;
    const result = await approve_policy({ policy_id, approved_by, comments });
    res.status(200).json({ status: true, message: "policy_approved", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const get_policy_details = async (req, res) => {
  try {
    const policy_id = req.params.id;
    const policy = await get_policy_by_id(policy_id);
    res.status(200).json({ status: true, message: "policy_details_fetched", data: policy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const get_active_policy_list = async (req, res) => {
  try {
    const { customer_company_id } = req.query;
    const policies = await get_active_policies(customer_company_id);
    res.status(200).json({ status: true, message: "active_policies_fetched", data: policies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

module.exports = {
  create_policy_from_template,
  create_policy_custom,
  patch_policy_config,
  post_policy_approval,
  get_policy_details,
  get_active_policy_list,
};
