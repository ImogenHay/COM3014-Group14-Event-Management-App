const Payment = require("../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    const userId = req.userId
    const { amount, currency, source } = req.body;
    try {
    // Create a charge with Stripe
        const charge = await stripe.charges.create({
            amount,
            currency,
            source,
            });
        const payment = new Payment({
            amount: charge.amount,
            currency: charge.currency,
            source: charge.source.id,
            status: charge.status,
        });

        const newPayment = await payment.save()
        res.status(201).json(newPayment);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while processing payment.");
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred while fetching payments.");
    }

};