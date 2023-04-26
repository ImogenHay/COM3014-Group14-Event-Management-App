const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Ticket", ticketSchema);
