const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

const router1 = router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get("/healthcheck", (req, res) => res.sendStatus(200));

router.get("/tickets/:userId", ticketController.getAllTickets);

router.post("/tickets", ticketController.addTicket);


module.exports = router1;
module.exports = router;