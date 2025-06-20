const router = require("express").Router();
const policies = require("./policies");
const templates = require("./templates");
const employees = require("./employees");
const acknowledgement = require("./acknowledgements");

router.use("/policies", policies);
router.use("/templates", templates);
router.use("/employees", employees);
router.use("/acknowledgement", acknowledgement);

module.exports = router;