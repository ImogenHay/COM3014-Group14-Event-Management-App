import EventsModel, { EventsDocument, EventsInput } from '../Models/events_model';

export default class EventsService {
    public async createEvent(event: EventsInput): Promise<EventsDocument> {
        const createdEvent = await EventsModel.create(event)
        return createdEvent
    }

    public async getAllEvents(): Promise<EventsDocument[]> {
        const events = await EventsModel.find()
        return events
    }

    public async getEventById(eventId: string): Promise<EventsDocument | null> {
        try {
            const event = await EventsModel.findOne({ eventId });
            return event;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    public async updateEvent(
        eventId: string,
        event: Partial<EventsInput>
    ): Promise<EventsDocument | null> {
        try {
            const updatedEvent = await EventsModel.findByIdAndUpdate(eventId, event, {
                new: true,
            })
            return updatedEvent
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    public async deleteEvent(eventId: string): Promise<void> {
        await EventsModel.findByIdAndDelete(eventId)
    }

    public async checkTicketsAvailability(eventId: string): Promise<boolean> {
        const event = await EventsModel.findById(eventId)
        if (!event) {
            throw new Error('Event not found')
        }
        return event.availableTickets > 0
    }

    public async bookTickets(
        eventId: string,
        numTickets: number
    ): Promise<EventsDocument> {
        const event = await EventsModel.findById(eventId)
        if (!event) {
            throw new Error('Event not found')
        }
        if (event.availableTickets < numTickets) {
            throw new Error('Not enough tickets available')
        }
        event.availableTickets -= numTickets
        const updatedEvent = await event.save()
        return updatedEvent
    }
}