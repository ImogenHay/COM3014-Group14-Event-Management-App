"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookEventTicketsHandler = exports.checkEventAvailabilityHandler = exports.deleteEventHandler = exports.getEventHandler = exports.getAllCurrentUserEventsHandler = exports.getAllEventsHandler = exports.updateEventHandler = exports.createEventHandler = void 0;
const events_service_1 = __importDefault(require("../Services/events_service"));
const eventService = new events_service_1.default();
function createEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        try {
            const body = req.body;
            const eventInput = {
                name: body.name,
                description: body.description,
                venue: body.venue,
                date: new Date(body.date),
                duration: body.duration,
                availableTickets: body.availableTickets,
                ticketPrice: body.ticketPrice,
                userId
            };
            // you would also give user: userId
            const event = yield eventService.createEvent(Object.assign({}, eventInput));
            return res.status(201).send(event.toJSON());
        }
        catch (er) {
            return res.status(500).send({ error: er.message });
        }
    });
}
exports.createEventHandler = createEventHandler;
function updateEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        const eventId = req.params.eventId;
        const updateBody = req.body;
        const updateEventInput = {
            name: updateBody.name,
            description: updateBody.description,
            venue: updateBody.venue,
            date: new Date(updateBody.date),
            duration: updateBody.duration,
            availableTickets: updateBody.availableTickets,
            ticketPrice: updateBody.ticketPrice,
            userId
        };
        const event = yield eventService.getEventById(eventId);
        // event doest exist
        if (event == null) {
            return res.sendStatus(404);
        }
        //  check to see if event belongs to the user
        if (event.userId !== userId) {
            return res.sendStatus(403);
        }
        try {
            const updatedEvent = yield eventService.updateEvent(eventId, updateEventInput);
            if (updatedEvent == null) {
                return res.sendStatus(409);
            }
            return res.send(updatedEvent.toJSON());
        }
        catch (er) {
            return res.status(500).send({ error: er.message });
        }
    });
}
exports.updateEventHandler = updateEventHandler;
function getAllEventsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allEvents = yield eventService.getAllEvents();
            return res.send(allEvents.map((event) => event.toJSON()));
        }
        catch (er) {
            return res.status(500).send({ error: er.message });
        }
    });
}
exports.getAllEventsHandler = getAllEventsHandler;
function getAllCurrentUserEventsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            const allCurrentUserEvents = yield eventService.getAllCurrentUserEvents(userId);
            // if the user has no events we return null
            if (allCurrentUserEvents == null) {
                return res.status(404).send({ error: 'No events found' });
            }
            // otherwise we turn the events into jsons and send those
            return res.send(allCurrentUserEvents.map((event) => event.toJSON()));
        }
        catch (er) {
            return res.status(500).send({ error: er.message });
        }
    });
}
exports.getAllCurrentUserEventsHandler = getAllCurrentUserEventsHandler;
function getEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = req.params.eventId;
            const event = yield eventService.getEventById(eventId);
            // if the event we are trying to access doesn't exist we send a 404 status
            if (event == null) {
                return res.sendStatus(404);
            }
            return res.send(event.toJSON());
        }
        catch (er) {
            return res.status(500).send({ error: er.message });
        }
    });
}
exports.getEventHandler = getEventHandler;
function deleteEventHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.userId;
        const eventId = req.params.eventId;
        const event = yield eventService.getEventById(eventId);
        // we retrieved the event we are trying to delete in order to check below
        // that it exists before we try to delete it
        if (event == null) {
            return res.sendStatus(404);
        }
        // check to see if event belongs to the user
        if (event.userId !== userId) {
            return res.sendStatus(403);
        }
        try {
            yield eventService.deleteEvent(eventId);
            return res.sendStatus(200);
        }
        catch (er) {
            return res.status(500).send({ error: er.message });
        }
    });
}
exports.deleteEventHandler = deleteEventHandler;
function checkEventAvailabilityHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = req.params.eventId;
        try {
            const ticketAvailability = yield eventService.checkTicketsAvailability(eventId);
            return res.send(ticketAvailability.toString());
        }
        catch (er) {
            const message = er.message;
            if (message === 'Event not found') {
                return res.sendStatus(404);
            }
            else {
                return res.status(500).send({ error: er.message });
            }
        }
    });
}
exports.checkEventAvailabilityHandler = checkEventAvailabilityHandler;
function bookEventTicketsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventId = req.params.eventId;
        const numberOfTickets = Number(req.params.numOfTickets);
        try {
            yield eventService.bookTickets(eventId, numberOfTickets);
            return res.sendStatus(200);
        }
        catch (er) {
            const message = er.message;
            if (message === 'Event not found') {
                return res.sendStatus(404);
            }
            else if (message === 'Must book at least one ticket') {
                return res.status(400).send({ error: er.message });
            }
            else if (message === 'Not enough tickets available') {
                return res.status(409).send({ error: er.message });
            }
            else {
                return res.status(500).send({ error: er.message });
            }
        }
    });
}
exports.bookEventTicketsHandler = bookEventTicketsHandler;
