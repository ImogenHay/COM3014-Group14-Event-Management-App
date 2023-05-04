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
const events_model_1 = __importDefault(require("../Models/events_model"));
const logger_1 = __importDefault(require("../Utils/logger"));
class EventsService {
    createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdEvent = yield events_model_1.default.create(event);
            return createdEvent;
        });
    }
    getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield events_model_1.default.find();
            return events;
        });
    }
    getAllCurrentUserEvents(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield events_model_1.default.find({ _id: userId });
                return events;
            }
            catch (err) {
                logger_1.default.error(err);
                return null;
            }
        });
    }
    getEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield events_model_1.default.findById(eventId);
                return event;
            }
            catch (err) {
                logger_1.default.error(err);
                return null;
            }
        });
    }
    updateEvent(eventId, event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedEvent = yield events_model_1.default.findOneAndUpdate({ _id: eventId }, event, { new: true, runValidators: true });
                return updatedEvent;
            }
            catch (err) {
                logger_1.default.error(err);
                return null;
            }
        });
    }
    deleteEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield events_model_1.default.findByIdAndDelete(eventId);
        });
    }
    checkTicketsAvailability(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield events_model_1.default.findById(eventId);
            if (event == null) {
                throw new Error('Event not found');
            }
            return event.availableTickets;
        });
    }
    bookTickets(eventId, numTickets) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield events_model_1.default.findById(eventId);
            if (event == null) {
                throw new Error('Event not found');
            }
            if (numTickets < 1) {
                throw new Error('Must book at least one ticket');
            }
            if (event.availableTickets < numTickets) {
                throw new Error('Not enough tickets available');
            }
            event.availableTickets -= numTickets;
            const updatedEvent = yield event.save();
            return updatedEvent;
        });
    }
}
exports.default = EventsService;
