import { type Express, type Request, type Response } from 'express'
import {
  bookEventTicketsHandler, checkEventAvailabilityHandler,
  createEventHandler, deleteEventHandler,
  getAllEventsHandler,
  getEventHandler, updateEventHandler

} from './Controllers/events_controller'
import { validateUser } from './Middleware/validateUser'
import validateResource from './Middleware/validateResource'
import {
  bookEventTicketsSchema,
  checkEventAvailabilitySchema,
  createEventSchema,
  deleteEventSchema,
  getEventSchema,
  updateEventSchema
} from './Schemas/events_schemas'

// creating a function that takes in a parameter of type expresss
function routes (app: Express) {
  app.get('/events/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  })
  app.post('/events/create', [validateUser, validateResource(createEventSchema)], createEventHandler)
  app.get('/events', validateUser, getAllEventsHandler)
  app.get('/events/:eventId', [validateUser, validateResource(getEventSchema)], getEventHandler)
  app.put('/events/:eventId', [validateUser, validateResource(updateEventSchema)], updateEventHandler)
  app.delete('/events/:eventId', [validateUser, validateResource(deleteEventSchema)], deleteEventHandler)
  app.get('/events/check/:eventId', [validateUser, validateResource(checkEventAvailabilitySchema)], checkEventAvailabilityHandler)
  app.put('/events/book-ticket/:eventId/:numOfTickets', [validateUser, validateResource(bookEventTicketsSchema)], bookEventTicketsHandler)
}

export default routes
