const router = require("express").Router();
const familySupportManagerController = require("../controllers/familySupportManagerController.js");

router.get(
  "/familySupportManager",
  familySupportManagerController.getFamilySupportManager,
);
router.post(
  "/createFamilySupportManager",
  familySupportManagerController.createFamilySupportManager,
);

module.exports = router;
