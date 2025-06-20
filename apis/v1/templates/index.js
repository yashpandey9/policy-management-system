const router = require("express").Router();
const {
  get_templates,
  patch_upgrade_template,
} = require("./controllers/template_controller");

router.patch("/templates/:id/upgrade", patch_upgrade_template);
router.get("/", get_templates);
module.exports = router;