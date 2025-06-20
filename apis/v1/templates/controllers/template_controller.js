const {
  fetch_all_templates,
  upgrade_template_version,
} = require("../services/template_service");

const get_templates = async (req, res) => {
  try {
    const templates = await fetch_all_templates();
    res.status(200).json({ status: true, message: "templates_fetched", data: templates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

const patch_upgrade_template = async (req, res) => {
  try {
    const template_id = req.params.id;
    const updated_template = await upgrade_template_version({ template_id });
    res.status(200).json({ status: true, message: "template_upgraded", data: updated_template });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: error.message, data: null });
  }
};

module.exports = {
  get_templates,
  patch_upgrade_template,
};