const { Router } = require("express");
const {
  cartProcess,
  cartFeedback,
} = require("../controllers/cartCheckoutController");
const router = Router();

router.post("/process", cartProcess);
router.get("/feedback", cartFeedback);
module.exports = router;
