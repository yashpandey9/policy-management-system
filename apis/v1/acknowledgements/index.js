const router = require("express").Router();
const {
  post_acknowledgement_request,
  get_pending_acknowledgement_requests,
  patch_escalate_acknowledgement_request,
} = require("./controllers/acknowledgement_request_controller");

router.post("/acknowledgement-request", post_acknowledgement_request);
router.get("/acknowledgement-requests/pending", get_pending_acknowledgement_requests);

router.patch("/acknowledgement-requests/:id/escalate", patch_escalate_acknowledgement_request);

module.exports = router;