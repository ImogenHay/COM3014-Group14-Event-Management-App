const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "succeeded",
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
