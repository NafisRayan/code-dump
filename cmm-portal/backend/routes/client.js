const router = require("express").Router();
const clientController = require("../controllers/clientController.js");

router.get("/clients", clientController.getClient);
router.post("/createClient", clientController.createClient);
router.get("/getClientsEmployees/:id", clientController.getClientsWithEmployees);

module.exports = router;
