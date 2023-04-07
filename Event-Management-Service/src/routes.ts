import { type Express, type Request, type Response } from 'express'
import {
  bookEventTicketsHandler, checkEventAvailabilityHandler,
  createEventHandler, deleteEventHandler,
  getAllEventsHandler,
  getEventHandler, updateEventHandler,

} from './Controllers/events_controller'

// creating a function that takes in a parameter of type expresss
function routes (app: Express) {
  app.get('/events/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  })
  app.post('/events/create', createEventHandler)
  app.get('/events', getAllEventsHandler)
  app.get('/events/:eventId', getEventHandler)
  app.put('events/:eventId', updateEventHandler)
  app.delete('events/:eventId', deleteEventHandler)
  app.get('/events/check/:eventId', checkEventAvailabilityHandler)
  app.put('/events/book-ticket/:eventId/:numOfTickets', bookEventTicketsHandler)
}

export default routes