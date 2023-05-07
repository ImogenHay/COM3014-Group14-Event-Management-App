const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

const validateUser= require("../Middleware/validateUser");

// Create a new payment via router

router.post("/payments",validateUser,paymentController.processPayment);
router.get("/getPayments",validateUser,paymentController.getPayments);

module.exports = router;

