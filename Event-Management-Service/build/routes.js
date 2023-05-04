"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_controller_1 = require("./Controllers/events_controller");
const validateUser_1 = __importDefault(require("./Middleware/validateUser"));
const validateResource_1 = __importDefault(require("./Middleware/validateResource"));
const events_schemas_1 = require("./Schemas/events_schemas");
// creating a function that takes in a parameter of type expresss
function routes(app) {
    app.get('/events/healthcheck', (req, res) => {
        res.sendStatus(200);
    });
    app.post('/events/create', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.createEventSchema)], events_controller_1.createEventHandler);
    app.get('/events', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.getAllEventsSchema)], events_controller_1.getAllEventsHandler);
    app.get('/events/allCurrentUserEvents', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.getAllCurrentUserEventsSchema)], events_controller_1.getAllCurrentUserEventsHandler);
    app.get('/events/:eventId', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.getEventSchema)], events_controller_1.getEventHandler);
    app.put('/events/:eventId', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.updateEventSchema)], events_controller_1.updateEventHandler);
    app.delete('/events/:eventId', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.deleteEventSchema)], events_controller_1.deleteEventHandler);
    app.get('/events/check/:eventId', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.checkEventAvailabilitySchema)], events_controller_1.checkEventAvailabilityHandler);
    app.put('/events/book-ticket/:eventId/:numOfTickets', [validateUser_1.default, (0, validateResource_1.default)(events_schemas_1.bookEventTicketsSchema)], events_controller_1.bookEventTicketsHandler);
}
exports.default = routes;
