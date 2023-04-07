import { type Request, type Response } from 'express'
import {
  type BookEventTicketsInput,
  type CheckEventAvailabilityInput,
  type CreateEventInput,
  type DeleteEventInput,
  type GetEventInput,
  type UpdateEventInput
} from '../Schemas/events_schemas'
import EventsService from '../Services/events_service'

const eventService = new EventsService()

export async function createEventHandler (req: Request<{}, {}, CreateEventInput['body']>, res: Response) {
  // reminder that user must be implmented
  // he has 2 cool middleware see if you can copy
  // const userId = res.loacls.user._id

  try {
    const body = req.body

    // you would also give user: userId
    const event = await eventService.createEvent({ ...body })

    return res.send(event.toJSON())
  } catch (er: any) {
    return res.sendStatus(500)
  }
}

export async function updateEventHandler (req: Request<UpdateEventInput['params'], {}, UpdateEventInput['body']>, res: Response) {
  // const userId = res.locals.user._id;

  const eventId = req.params.eventId
  const updateBody = req.body

  const event = await eventService.getEventById(eventId)

  // event doest exist
  if (event == null) {
    return res.sendStatus(404)
  }

  // check to see if event belongs to the user
  // if (event.user) !== userId {
  //   return res.sendStatus(403);
  // }

  try {
    const updatedEvent = await eventService.updateEvent(eventId, updateBody)
    return res.send(updatedEvent?.toJSON())
  } catch (er: any) {
    return res.sendStatus(500)
  }
}

export async function getAllEventsHandler (req: Request, res: Response) {
  try {
    const allEvents = await eventService.getAllEvents()

    return res.send(allEvents.map((event) => JSON.stringify(event)))
  } catch (er: any) {
    return res.sendStatus(500)
  }
}

export async function getEventHandler (req: Request<GetEventInput['params']>, res: Response) {
  try {
    const eventId = req.params.eventId

    const event = await eventService.getEventById(eventId)

    // if the event we are trying to access doesnt exist we send a 404 status
    if (event == null) {
      return res.sendStatus(404)
    }

    return res.send(event.toJSON())
  } catch (er: any) {
    return res.sendStatus(500)
  }
}

export async function deleteEventHandler (req: Request<DeleteEventInput['params']>, res: Response) {
  // must be implemented having access to the user
  // const userId = res.locals.user._id;

  const eventId = req.params.eventId

  const event = await eventService.getEventById(eventId)

  // we retrieved the event we are trying to delete in order to check below
  // that it exists before we try to delete it
  if (event == null) {
    return res.sendStatus(404)
  }

  // check to see if event belongs to the user
  // if (event.user) !== userId {
  //   return res.sendStatus(403);
  // }

  try {
    await eventService.deleteEvent(eventId)
    return res.sendStatus(200)
  } catch (er: any) {
    return res.sendStatus(500)
  }
}

export async function checkEventAvailabilityHandler (req: Request<CheckEventAvailabilityInput['params']>, res: Response) {
  const eventId = req.params.eventId

  try {
    const ticketAvailability = await eventService.checkTicketsAvailability(eventId)
    return res.send(ticketAvailability)
  } catch (er: any) {
    const message = er.message

    if (message === 'Event not found') {
      return res.sendStatus(404)
    } else {
      return res.sendStatus(500)
    }
  }
}

export async function bookEventTicketsHandler (req: Request<BookEventTicketsInput['params']>, res: Response) {
  const eventId = req.params.eventId
  const numberOfTickets = req.params.numberOfTickets

  try {
    await eventService.bookTickets(eventId, numberOfTickets)
    return res.sendStatus(200)
  } catch (er: any) {
    const message = er.message

    if (message === 'Event not found') {
      return res.sendStatus(404)
    } else if (message === 'Must book at least one ticket') {
      return res.sendStatus(400)
    } else if (message === 'Not enough tickets available') {
      return res.sendStatus(409)
    } else {
      return res.sendStatus(500)
    }
  }
}
