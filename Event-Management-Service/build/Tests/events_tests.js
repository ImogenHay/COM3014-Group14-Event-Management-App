"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("mongoose"));
const events_service_1 = __importDefault(require("../Services/events_service"));
const connect_1 = __importDefault(require("../Utils/connect"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
describe('EventsService', () => {
    let eventsService;
    const validEventInput = {
        name: 'Test Event',
        description: 'This is a test event',
        venue: 'Test Venue',
        date: new Date(Date.now() + 86400000),
        duration: 120,
        availableTickets: 100
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, connect_1.default)();
        eventsService = new events_service_1.default();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // await mongoose.connection.dropDatabase();
        yield mongoose_1.default.connection.close();
    }));
    describe('deleteEvent', () => {
        it('should delete an event', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            yield eventsService.deleteEvent(createdEvent._id);
            const event = yield eventsService.getEventById(createdEvent._id);
            expect(event).toBeNull();
        }));
    });
    describe('createEvent', () => {
        it('should create a valid event', () => __awaiter(void 0, void 0, void 0, function* () {
            const event = yield eventsService.createEvent(validEventInput);
            expect(event.name).toBe(validEventInput.name);
            expect(event.description).toBe(validEventInput.description);
            expect(event.venue).toBe(validEventInput.venue);
            expect(event.date.toISOString()).toBe(validEventInput.date.toISOString());
            expect(event.duration).toBe(validEventInput.duration);
            expect(event.availableTickets).toBe(validEventInput.availableTickets);
            yield eventsService.deleteEvent(event._id);
        }));
        it('should throw error for no name', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidEventInput = Object.assign(Object.assign({}, validEventInput), { name: '' });
            yield expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow();
        }));
        it('should throw error for too long name', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidEventInput = Object.assign(Object.assign({}, validEventInput), { name: 'a'.repeat(51) });
            yield expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow();
        }));
        it('should throw error for too long description', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidEventInput = Object.assign(Object.assign({}, validEventInput), { description: 'a'.repeat(501) });
            yield expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow();
        }));
        it('should throw error when date before current date', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidEventInput = Object.assign(Object.assign({}, validEventInput), { date: new Date('2022-03-27') });
            yield expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow();
        }));
        it('should throw error if duration not positive', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidEventInput = Object.assign(Object.assign({}, validEventInput), { duration: 0 });
            yield expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow();
        }));
        it('should throw error if available tickets negative', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidEventInput = Object.assign(Object.assign({}, validEventInput), { availableTickets: -1 });
            yield expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow();
        }));
    });
    describe('getAllEvents', () => {
        it('returns an array of events', () => __awaiter(void 0, void 0, void 0, function* () {
            const events = yield eventsService.getAllEvents();
            expect(events).toBeInstanceOf(Array);
        }));
    });
    describe('getEventById', () => {
        it('returns an event with the specified ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const event = yield eventsService.getEventById(createdEvent._id);
            yield eventsService.deleteEvent(createdEvent._id);
            expect(event).not.toBeNull();
            expect(event === null || event === void 0 ? void 0 : event._id.equals(createdEvent._id)).toBe(true);
            expect(event === null || event === void 0 ? void 0 : event.name).toBe(validEventInput.name);
            expect(event === null || event === void 0 ? void 0 : event.description).toBe(validEventInput.description);
            expect(event === null || event === void 0 ? void 0 : event.venue).toBe(validEventInput.venue);
            expect(event === null || event === void 0 ? void 0 : event.date.toISOString()).toBe(validEventInput.date.toISOString());
            expect(event === null || event === void 0 ? void 0 : event.duration).toBe(validEventInput.duration);
            expect(event === null || event === void 0 ? void 0 : event.availableTickets).toBe(validEventInput.availableTickets);
        }));
        it('returns null if no event is found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const invalidId = createdEvent._id;
            yield eventsService.deleteEvent(createdEvent._id);
            const event = yield eventsService.getEventById(invalidId.toString());
            expect(event).toBeNull();
        }));
    });
    describe('updateEvent', () => {
        it('should update an event', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const updatedEvent = yield eventsService.updateEvent(createdEvent._id, { name: 'New Name' });
            yield eventsService.deleteEvent(createdEvent._id);
            expect(updatedEvent === null || updatedEvent === void 0 ? void 0 : updatedEvent.name).toBe('New Name');
        }));
        it('should return null if no event is found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const invalidId = createdEvent._id;
            yield eventsService.deleteEvent(createdEvent._id);
            const updatedEvent = yield eventsService.updateEvent(invalidId.toString(), { name: 'New Name' });
            expect(updatedEvent).toBeNull();
        }));
    });
    describe('checkTicketsAvailability', () => {
        it('should return number of tickets are available', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const isAvailable = yield eventsService.checkTicketsAvailability(createdEvent._id);
            yield eventsService.deleteEvent(createdEvent._id);
            expect(isAvailable).toBe(100);
        }));
        it('should throw an error if event is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const invalidId = createdEvent._id;
            yield eventsService.deleteEvent(createdEvent._id);
            yield expect(eventsService.checkTicketsAvailability(invalidId.toString())).rejects.toThrow('Event not found');
        }));
        it('should return 0 if tickets are not available', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            yield eventsService.bookTickets(createdEvent._id, validEventInput.availableTickets);
            const isAvailable = yield eventsService.checkTicketsAvailability(createdEvent._id);
            yield eventsService.deleteEvent(createdEvent._id);
            expect(isAvailable).toBe(0);
        }));
    });
    describe('bookTickets', () => {
        it('should book tickets for an event', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const updatedEvent = yield eventsService.bookTickets(createdEvent._id, 1);
            yield eventsService.deleteEvent(createdEvent._id);
            expect(updatedEvent.availableTickets).toBe(validEventInput.availableTickets - 1);
        }));
        it('should throw an error if event is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            const invalidId = createdEvent._id;
            yield eventsService.deleteEvent(createdEvent._id);
            yield expect(eventsService.bookTickets(invalidId.toString(), 1)).rejects.toThrow('Event not found');
        }));
        it('should throw an error if not enough ticket tickets booked', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            yield expect(eventsService.bookTickets(createdEvent._id, 0)).rejects.toThrow('Must book at least one ticket');
            yield eventsService.deleteEvent(createdEvent._id);
        }));
        it('should throw an error if not enough tickets available', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdEvent = yield eventsService.createEvent(validEventInput);
            yield expect(eventsService.bookTickets(createdEvent._id, validEventInput.availableTickets + 1)).rejects.toThrow('Not enough tickets available');
            yield eventsService.deleteEvent(createdEvent._id);
        }));
    });
});
