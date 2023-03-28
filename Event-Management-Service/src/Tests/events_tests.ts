import mongoose from 'mongoose'
import EventsService from '../Services/events_service'
import { type EventsInput } from '../Models/events_model'
import connect from '../Utils/connect'

describe('EventsService', () => {
  let eventsService: EventsService

  const validEventInput: EventsInput = {
    name: 'Test Event',
    description: 'This is a test event',
    venue: 'Test Venue',
    date: new Date(Date.now() + 86400000), // make sure date in future
    duration: 120,
    availableTickets: 100
  }

  beforeAll(async () => {
    await connect()
    eventsService = new EventsService()
  })

  afterAll(async () => {
    // await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
  })

  describe('deleteEvent', () => {
    it('should delete an event', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      await eventsService.deleteEvent(createdEvent._id)
      const event = await eventsService.getEventById(createdEvent._id)
      expect(event).toBeNull()
    })
  })

  describe('createEvent', () => {
    it('should create a valid event', async () => {
      const event = await eventsService.createEvent(validEventInput)
      expect(event.name).toBe(validEventInput.name)
      expect(event.description).toBe(validEventInput.description)
      expect(event.venue).toBe(validEventInput.venue)
      expect(event.date.toISOString()).toBe(validEventInput.date.toISOString())
      expect(event.duration).toBe(validEventInput.duration)
      expect(event.availableTickets).toBe(validEventInput.availableTickets)
      await eventsService.deleteEvent(event._id)
    })
    it('should throw error for no name', async () => {
      const invalidEventInput: EventsInput = { ...validEventInput, name: '' }
      await expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow()
    })
    it('should throw error for too long name', async () => {
      const invalidEventInput: EventsInput = { ...validEventInput, name: 'a'.repeat(51) }
      await expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow()
    })
    it('should throw error for too long description', async () => {
      const invalidEventInput: EventsInput = { ...validEventInput, description: 'a'.repeat(501) }
      await expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow()
    })
    it('should throw error when date before current date', async () => {
      const invalidEventInput: EventsInput = { ...validEventInput, date: new Date('2022-03-27') }
      await expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow()
    })
    it('should throw error if duration not positive', async () => {
      const invalidEventInput: EventsInput = { ...validEventInput, duration: 0 }
      await expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow()
    })
    it('should throw error if available tickets negative', async () => {
      const invalidEventInput: EventsInput = { ...validEventInput, availableTickets: -1 }
      await expect(eventsService.createEvent(invalidEventInput)).rejects.toThrow()
    })
  })

  describe('getAllEvents', () => {
    it('returns an array of events', async () => {
      const events = await eventsService.getAllEvents()
      expect(events).toBeInstanceOf(Array)
    })
  })

  describe('getEventById', () => {
    it('returns an event with the specified ID', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const event = await eventsService.getEventById(createdEvent._id)
      await eventsService.deleteEvent(createdEvent._id)
      expect(event).not.toBeNull()
      expect(event?._id.equals(createdEvent._id)).toBe(true)
      expect(event?.name).toBe(validEventInput.name)
      expect(event?.description).toBe(validEventInput.description)
      expect(event?.venue).toBe(validEventInput.venue)
      expect(event?.date.toISOString()).toBe(validEventInput.date.toISOString())
      expect(event?.duration).toBe(validEventInput.duration)
      expect(event?.availableTickets).toBe(validEventInput.availableTickets)
    })

    it('returns null if no event is found', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const invalidId = createdEvent._id
      await eventsService.deleteEvent(createdEvent._id)
      const event = await eventsService.getEventById(invalidId.toString())
      expect(event).toBeNull()
    })
  })

  describe('updateEvent', () => {
    it('should update an event', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const updatedEvent = await eventsService.updateEvent(createdEvent._id, { name: 'New Name' })
      await eventsService.deleteEvent(createdEvent._id)
      expect(updatedEvent?.name).toBe('New Name')
    })
    it('should return null if no event is found', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const invalidId = createdEvent._id
      await eventsService.deleteEvent(createdEvent._id)
      const updatedEvent = await eventsService.updateEvent(invalidId.toString(), { name: 'New Name' })
      expect(updatedEvent).toBeNull()
    })
  })

  describe('checkTicketsAvailability', () => {
    it('should return true if tickets are available', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const isAvailable = await eventsService.checkTicketsAvailability(createdEvent._id)
      await eventsService.deleteEvent(createdEvent._id)
      expect(isAvailable).toBe(true)
    })
    it('should throw an error if event is not found', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const invalidId = createdEvent._id
      await eventsService.deleteEvent(createdEvent._id)
      await expect(eventsService.checkTicketsAvailability(invalidId.toString())).rejects.toThrow('Event not found')
    })
    it('should return false if tickets are not available', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      await eventsService.bookTickets(createdEvent._id, validEventInput.availableTickets)
      const isAvailable = await eventsService.checkTicketsAvailability(createdEvent._id)
      await eventsService.deleteEvent(createdEvent._id)
      expect(isAvailable).toBe(false)
    })
  })

  describe('bookTickets', () => {
    it('should book tickets for an event', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const updatedEvent = await eventsService.bookTickets(createdEvent._id, 1)
      await eventsService.deleteEvent(createdEvent._id)
      expect(updatedEvent.availableTickets).toBe(validEventInput.availableTickets - 1)
    })
    it('should throw an error if event is not found', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      const invalidId = createdEvent._id
      await eventsService.deleteEvent(createdEvent._id)
      await expect(eventsService.bookTickets(invalidId.toString(), 1)).rejects.toThrow('Event not found')
    })
    it('should throw an error if not enough ticket tickets booked', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      await expect(eventsService.bookTickets(createdEvent._id, 0)).rejects.toThrow('Must book at least one ticket')
      await eventsService.deleteEvent(createdEvent._id)
    })
    it('should throw an error if not enough tickets available', async () => {
      const createdEvent = await eventsService.createEvent(validEventInput)
      await expect(eventsService.bookTickets(createdEvent._id, validEventInput.availableTickets + 1)).rejects.toThrow('Not enough tickets available')
      await eventsService.deleteEvent(createdEvent._id)
    })
  })
})
