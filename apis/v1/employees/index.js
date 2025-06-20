const router = require("express").Router();
const {
  create_employee,
  get_policies_to_acknowledge,
  post_acknowledgement,
  get_acknowledgement_history,
} = require("./controllers/employee_controller");

router.post("/", create_employee);
router.get("/:id/policies-to-acknowledge", get_policies_to_acknowledge);

router.post("/:id/acknowledge", post_acknowledgement);
router.get("/:id/history", get_acknowledgement_history);

module.exports = router;