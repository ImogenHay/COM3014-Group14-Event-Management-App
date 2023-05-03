const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const validateUser= require("../Middleware/validateUser");

router.get("/healthcheck", (req, res) => res.sendStatus(200));

router.get("/tickets/:userId",validateUser, ticketController.getAllTickets);

router.post("/tickets",validateUser, ticketController.addTicket);

module.exports = router;