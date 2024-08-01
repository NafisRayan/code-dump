const router = require("express").Router();
const accountabilityCoachController = require("../controllers/accountabilityCoachController.js");

router.get(
  "/accountabilityCoach",
  accountabilityCoachController.getAccountabilityCoach,
);
router.post(
  "/createAccountabilityCoach",
  accountabilityCoachController.createAccountabilityCoach,
);

module.exports = router;
