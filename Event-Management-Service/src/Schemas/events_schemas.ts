import { object, number, string, type TypeOf } from 'zod'

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    description: string({
      required_error: 'Description is required'
    }),
    venue: string({
      required_error: 'Venue name is required'
    }),
    date: string({
      required_error: 'Date is required'
    }),
    duration: number({
      required_error: 'Duration is required'
    }),
    availableTickets: number({
      required_error: 'Number of available tickets is required'
    }),
    ticketPrice: number({
      required_error: 'The price of a ticket is required'
    })
  })
}

const params1 = {
  params: object({
    eventId: string({
      required_error: 'The events id is required'
    })
  })
}

const params2 = {
  params: object({
    eventId: string({
      required_error: 'The events id is required'
    }),
    numOfTickets: string({
      required_error: 'Number of tickets you are trying to buy is required'
    })
  })
}

// defining all of our schemas using the definitions from above
export const createEventSchema = object({
  ...payload
})

export const updateEventSchema = object({
  ...params1,
  ...payload
})

export const deleteEventSchema = object({
  ...params1
})

export const getEventSchema = object({
  ...params1
})

export const checkEventAvailabilitySchema = object({
  ...params1
})

export const bookEventTicketsSchema = object({
  ...params2
})

// exporting all of our types
export type CreateEventInput = TypeOf<typeof createEventSchema>
export type UpdateEventInput = TypeOf<typeof updateEventSchema>
export type DeleteEventInput = TypeOf<typeof deleteEventSchema>
export type GetEventInput = TypeOf<typeof getEventSchema>
export type CheckEventAvailabilityInput = TypeOf<typeof checkEventAvailabilitySchema>
export type BookEventTicketsInput = TypeOf<typeof bookEventTicketsSchema>
