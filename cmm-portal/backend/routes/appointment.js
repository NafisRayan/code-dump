const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController.js");

router.get("/appointments", appointmentController.getAppointments);
router.get("/appointmentsClients", appointmentController.getAppointmentsClients);
router.post("/createAppointment", appointmentController.createAppointment);
router.patch("/updateAppointment/:id", appointmentController.updateAppointment);
router.patch("/updateAppointmentStatus/:id", appointmentController.updateAppointmentStatus);
router.patch("/updateAppointmentNote/:id", appointmentController.updateAppointmentNote);
router.delete("/appointment", appointmentController.deleteAppointments);

module.exports = router;

