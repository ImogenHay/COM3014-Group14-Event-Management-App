"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookEventTicketsSchema = exports.checkEventAvailabilitySchema = exports.getEventSchema = exports.getAllCurrentUserEventsSchema = exports.getAllEventsSchema = exports.deleteEventSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required'
        }),
        description: (0, zod_1.string)({
            required_error: 'Description is required'
        }),
        venue: (0, zod_1.string)({
            required_error: 'Venue name is required'
        }),
        date: (0, zod_1.string)({
            required_error: 'Date is required'
        }),
        duration: (0, zod_1.number)({
            required_error: 'Duration is required'
        }),
        availableTickets: (0, zod_1.number)({
            required_error: 'Number of available tickets is required'
        }),
        ticketPrice: (0, zod_1.number)({
            required_error: 'The price of a ticket is required'
        })
    })
};
const params1 = {
    params: (0, zod_1.object)({
        authorization: (0, zod_1.string)({
            required_error: 'The events id is required'
        }),
        eventId: (0, zod_1.string)({
            required_error: 'The events id is required'
        })
    })
};
const params2 = {
    params: (0, zod_1.object)({
        authorization: (0, zod_1.string)({
            required_error: 'The events id is required'
        }),
        eventId: (0, zod_1.string)({
            required_error: 'The events id is required'
        }),
        numOfTickets: (0, zod_1.string)({
            required_error: 'Number of tickets you are trying to buy is required'
        })
    })
};
const params3 = {
    params: (0, zod_1.object)({
        authorization: (0, zod_1.string)({
            required_error: 'The events id is required'
        })
    })
};
// defining all of our schemas using the definitions from above
exports.createEventSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateEventSchema = (0, zod_1.object)(Object.assign(Object.assign({}, params1), payload));
exports.deleteEventSchema = (0, zod_1.object)(Object.assign({}, params1));
exports.getAllEventsSchema = (0, zod_1.object)(Object.assign({}, params3));
exports.getAllCurrentUserEventsSchema = (0, zod_1.object)(Object.assign({}, params3));
exports.getEventSchema = (0, zod_1.object)(Object.assign({}, params1));
exports.checkEventAvailabilitySchema = (0, zod_1.object)(Object.assign({}, params1));
exports.bookEventTicketsSchema = (0, zod_1.object)(Object.assign({}, params2));
