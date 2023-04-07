import { object, number, string, date, type TypeOf } from 'zod'

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required'
    }),
    description: string({
      required_error: 'Description is required'
    }).min(120, 'Description should be atleast 120 characters long'),
    venue: string({
      required_error: 'Venue name is required'
    }),
    date: date({
      required_error: 'Date is required'
    }),
    duration: number({
      required_error: 'Duration is required'
    }),
    availableTickets: number({
      required_error: 'Number of available tickets is required'
    })
  })
}

const params1 = {
  params: object({
    eventId: string({
      required_error: 'eventId is required'
    })
  })
}

const params2 = {
  params: object({
    eventId: string({
      required_error: 'eventId is required'
    }),
    numberOfTickets: number({
      required_error: 'Number of tickets you are trying to buys is required'
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

// exporting all of our types
export type CreateEventInput = TypeOf<typeof createEventSchema>
export type UpdateEventInput = TypeOf<typeof updateEventSchema>
export type DeleteEventInput = TypeOf<typeof deleteEventSchema>
export type GetEventInput = TypeOf<typeof getEventSchema>
