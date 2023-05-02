const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a new payment
router.post("/payments", async (req, res) => {
    const { amount, currency, source } = req.body;

    try {
        // Create a charge with Stripe
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
        });

        // Create a new payment record in the database
        const payment = await Payment.create({
            amount: charge.amount,
            currency: charge.currency,
            source: charge.source.id,
            status: charge.status,
        });

        res.json(payment);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while processing payment.");
    }
});

// Get all payments
router.get("/payments", async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching payments.");
    }
});

module.exports = router;
