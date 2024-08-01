const router = require("express").Router();
const eventsController = require("../controllers/events.js");

router.get("/events", eventsController.getEvents);
router.post("/createEvent", eventsController.createEvents);

module.exports = router;