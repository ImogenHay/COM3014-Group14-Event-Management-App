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
  const userId = req.userId

  try {
    const body = req.body

    const eventInput = {
      name: body.name,
      description: body.description,
      venue: body.venue,
      date: new Date(body.date),
      duration: body.duration,
      availableTickets: body.availableTickets,
      ticketPrice: body.ticketPrice,
      userId
    }

    // you would also give user: userId
    const event = await eventService.createEvent({ ...eventInput })

    return res.status(201).send(event.toJSON())
  } catch (er: any) {
    return res.status(500).send({ error: er.message })
  }
}

export async function updateEventHandler (req: Request<UpdateEventInput['params'], {}, UpdateEventInput['body']>, res: Response) {
  const userId = req.userId

  const eventId = req.params.eventId
  const updateBody = req.body

  const updateEventInput = {
    name: updateBody.name,
    description: updateBody.description,
    venue: updateBody.venue,
    date: new Date(updateBody.date),
    duration: updateBody.duration,
    availableTickets: updateBody.availableTickets,
    ticketPrice: updateBody.ticketPrice,
    userId
  }

  const event = await eventService.getEventById(eventId)

  // event doest exist
  if (event == null) {
    return res.sendStatus(404)
  }

  //  check to see if event belongs to the user
  if (event.userId !== userId) {
    return res.sendStatus(403)
  }

  try {
    const updatedEvent = await eventService.updateEvent(eventId, updateEventInput)

    if (updatedEvent == null) {
      return res.sendStatus(409)
    }

    return res.send(updatedEvent.toJSON())
  } catch (er: any) {
    return res.status(500).send({ error: er.message })
  }
}

export async function getAllEventsHandler (req: Request, res: Response) {
  try {
    const allEvents = await eventService.getAllEvents()

    return res.send(allEvents.map((event) => event.toJSON()))
  } catch (er: any) {
    return res.status(500).send({ error: er.message })
  }
}

export async function getAllCurrentUserEventsHandler (req: Request, res: Response) {
  try {
    const userId = req.userId

    const allCurrentUserEvents = await eventService.getAllCurrentUserEvents(userId)

    // if the user has no events we return null
    if (allCurrentUserEvents == null) {
      return res.status(404).send({ error: 'No events found' })
    }

    // otherwise we turn the events into jsons and send those
    return res.send(allCurrentUserEvents.map((event) => event.toJSON()))
  } catch (er: any) {
    return res.status(500).send({ error: er.message })
  }
}

export async function getEventHandler (req: Request<GetEventInput['params']>, res: Response) {
  try {
    const eventId = req.params.eventId

    const event = await eventService.getEventById(eventId)

    // if the event we are trying to access doesn't exist we send a 404 status
    if (event == null) {
      return res.sendStatus(404)
    }

    return res.send(event.toJSON())
  } catch (er: any) {
    return res.status(500).send({ error: er.message })
  }
}

export async function deleteEventHandler (req: Request<DeleteEventInput['params']>, res: Response) {
  const userId = res.locals.userId

  const eventId = req.params.eventId

  const event = await eventService.getEventById(eventId)

  // we retrieved the event we are trying to delete in order to check below
  // that it exists before we try to delete it
  if (event == null) {
    return res.sendStatus(404)
  }

  // check to see if event belongs to the user
  if (event.userId !== userId) {
    return res.sendStatus(403)
  }

  try {
    await eventService.deleteEvent(eventId)
    return res.sendStatus(200)
  } catch (er: any) {
    return res.status(500).send({ error: er.message })
  }
}

export async function checkEventAvailabilityHandler (req: Request<CheckEventAvailabilityInput['params']>, res: Response) {
  const eventId = req.params.eventId

  try {
    const ticketAvailability = await eventService.checkTicketsAvailability(eventId)
    return res.send(ticketAvailability.toString())
  } catch (er: any) {
    const message = er.message

    if (message === 'Event not found') {
      return res.sendStatus(404)
    } else {
      return res.status(500).send({ error: er.message })
    }
  }
}

export async function bookEventTicketsHandler (req: Request<BookEventTicketsInput['params']>, res: Response) {
  const eventId = req.params.eventId
  const numberOfTickets = Number(req.params.numOfTickets)

  try {
    await eventService.bookTickets(eventId, numberOfTickets)
    return res.sendStatus(200)
  } catch (er: any) {
    const message = er.message

    if (message === 'Event not found') {
      return res.sendStatus(404)
    } else if (message === 'Must book at least one ticket') {
      return res.status(400).send({ error: er.message })
    } else if (message === 'Not enough tickets available') {
      return res.status(409).send({ error: er.message })
    } else {
      return res.status(500).send({ error: er.message })
    }
  }
}
