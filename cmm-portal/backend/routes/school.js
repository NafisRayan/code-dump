const router = require("express").Router();

const schoolController = require("../controllers/schoolController");

router.get("/schools", schoolController.getSchools);
router.post("/checkSchool", schoolController.checkSchool);
router.post("/addSchool", schoolController.addSchool);

module.exports = router;
