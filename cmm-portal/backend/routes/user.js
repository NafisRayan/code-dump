const router = require("express").Router();
const userController = require("../controllers/userController.js");

// router.get("/tutors", userController.getTutors);
router.get("/users", userController.getUsers);

module.exports = router;
