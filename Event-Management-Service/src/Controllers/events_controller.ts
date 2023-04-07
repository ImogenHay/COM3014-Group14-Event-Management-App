import { type Request, type Response } from 'express'
import {
  type CreateEventInput,
  DeleteEventInput,
  type GetEventInput,
  type UpdateEventInput
} from '../Schemas/events_schemas'
import EventsService from '../Services/events_service'

const eventService = new EventsService()

export async function createEventHandler (req: Request<{}, {}, CreateEventInput['body']>, res: Response) {
  // reminder that user must be implmented
  // he has 2 cool middleware see if you can copy
  // const userId = res.loacls.user._id

  const body = req.body

  // you would also give user: userId
  const event = await eventService.createEvent({ ...body })

  return res.send(event.toJSON())
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

  const updatedEvent = await eventService.updateEvent(eventId, updateBody)

  return res.send(updatedEvent?.toJSON())
}

export async function getAllEventsHandler (req: Request, res: Response) {
  const allEvents = await eventService.getAllEvents()

  return res.send(allEvents.map((event) => JSON.stringify(event)));
}

export async function getEventHandler (req: Request<GetEventInput['params']>, res: Response) {
  const eventId = req.params.eventId

  const event = await eventService.getEventById(eventId)

  // if the event we are trying to access doesnt exist we send a 404 status
  if (event == null) {
    return res.sendStatus(404)
  }

  return res.send(event.toJSON())
}

export async function deleteEventHandler (req: Request<DeleteEventInput['params']>, res: Response) {
  // must be implemented having access to the user
  // const userId = res.locals.user._id;

  const eventId = req.params.eventId;

  const event = await eventService.getEventById(eventId);

  // we retrieved the event we are trying to delete in order to check below
  // that it exists before we try to delete it
  if (event == null) {
    return res.sendStatus(404)
  }

  // check to see if event belongs to the user
  // if (event.user) !== userId {
  //   return res.sendStatus(403);
  // }

  await eventService.deleteEvent(eventId);

  return res.sendStatus(200);
}

export function checkAvailabilityHandler (req: Request, Res: Response) {

}

export function bookTicketsHandler (req: Request, Res: Response) {

}
