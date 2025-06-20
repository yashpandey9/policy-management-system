const router = require("express").Router();
const {
  create_policy_from_template,
  create_policy_custom,
  patch_policy_config,
  post_policy_approval,
  get_policy_details,
  get_active_policy_list,
} = require("./controllers/policy_controller");

router.post("/policies/from-template", create_policy_from_template);
router.post("/policies/custom", create_policy_custom);

router.patch("/policies/:id/config", patch_policy_config);
router.post("/policies/:id/approve", post_policy_approval);

router.get("/policies/:id", get_policy_details);
router.get("/policies/active", get_active_policy_list);
module.exports = router;