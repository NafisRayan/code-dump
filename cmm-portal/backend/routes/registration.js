const express = require("express");
const router = express.Router();

const newStudentNewParentController = require("../controllers/registration/newStudentNewParentController");
const newStudentExistingParentController = require("../controllers/registration/newStudentExistingParentController");
const newParentExistingStudentController = require("../controllers/registration/newParentExistingStudentController");

router.post("/register/new-student-new-parent", newStudentNewParentController);
router.post("/register/new-parent-existing-student", newParentExistingStudentController);
router.post("/register/new-student-existing-parent", newStudentExistingParentController);


module.exports = router;