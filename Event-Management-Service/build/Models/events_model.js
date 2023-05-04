"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value.getTime() > Date.now();
            },
            message: 'Event date must be after current date'
        }
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Duration must be positive'
        }
    },
    availableTickets: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Available Tickets cannot be negative'
        }
    },
    ticketPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Ticket price cannot be negative'
        }
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });
const EventsModel = (0, mongoose_1.model)('Events', eventsSchema);
exports.default = EventsModel;
