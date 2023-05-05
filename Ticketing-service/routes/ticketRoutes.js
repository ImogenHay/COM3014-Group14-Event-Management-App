const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.get("/healthcheck", (req, res) => res.sendStatus(200));

router.get("/tickets/:userId", ticketController.getAllTickets);

router.post("/tickets", ticketController.addTicket);

module.exports = router;