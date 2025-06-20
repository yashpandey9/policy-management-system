const router = require("express").Router();
const {
  get_templates,
  patch_upgrade_template,
} = require("./controllers/template_controller");

router.post("/acknowledgement-requests/:id/escalate", patch_upgrade_template);
router.get("/templates", get_templates);
module.exports = router;