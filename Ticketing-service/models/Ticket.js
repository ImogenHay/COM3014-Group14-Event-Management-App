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
    venue: {
        type: String,
        required: true,
    },
    tickets: {
        type: Number,
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
    email: {
        type: String,
        required: true,
    },
    booked: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Ticket", ticketSchema);
