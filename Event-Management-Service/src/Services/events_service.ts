import EventsModel, { type EventsDocument, type EventsInput } from '../Models/events_model'
import logger from '../Utils/logger'

export default class EventsService {
  public async createEvent (event: EventsInput): Promise<EventsDocument> {
    const createdEvent = await EventsModel.create(event)
    return createdEvent
  }

  public async getAllEvents (): Promise<EventsDocument[]> {
    const events = await EventsModel.find()
    return events
  }

  public async getEventById (eventId: string): Promise<EventsDocument | null> {
    try {
      const event = await EventsModel.findById(eventId)
      return event
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async updateEvent (
    eventId: string,
    event: Partial<EventsInput>
  ): Promise<EventsDocument | null> {
    try {
      const updatedEvent = await EventsModel.findByIdAndUpdate(eventId, event, {
        new: true
      })
      return updatedEvent
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  public async deleteEvent (eventId: string): Promise<void> {
    await EventsModel.findByIdAndDelete(eventId)
  }

  public async checkTicketsAvailability (eventId: string): Promise<number> {
    const event = await EventsModel.findById(eventId)
    if (event == null) {
      throw new Error('Event not found')
    }
    return event.availableTickets
  }

  public async bookTickets (
    eventId: string,
    numTickets: number
  ): Promise<EventsDocument> {
    const event = await EventsModel.findById(eventId)
    if (event == null) {
      throw new Error('Event not found')
    }
    if (numTickets < 1) {
      throw new Error('Must book at least one ticket')
    }
    if (event.availableTickets < numTickets) {
      throw new Error('Not enough tickets available')
    }
    event.availableTickets -= numTickets
    const updatedEvent = await event.save()
    return updatedEvent
  }
}
