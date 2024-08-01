const router = require("express").Router();
const advisorController = require("../controllers/advisorController.js");

router.get("/advisor", advisorController.getAdvisor);
router.post("/createAdvisor", advisorController.createAdvisor);

module.exports = router;
