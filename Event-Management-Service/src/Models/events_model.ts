import { type Document, model, Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export interface EventsInput extends Document {
  name: string
  description: string
  venue: string
  date: Date
  duration: number
  ticketsBooked: number
}

export interface EventsDocument extends EventsInput, Document {
  createdAt: Date
  updatedAt: Date
}

const eventsSchema: Schema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      default: () => `event_${nanoid()}`
    },
    name: {
      type: String,
      required: true,
      maxlength: 50
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    venue: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value.getTime() > Date.now()
        },
        message: 'Event date must be after current date'
      }
    },
    duration: {
      type: Number,
      required: true
    },
    availableTickets: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value >= 0
        },
        message: 'Available Tickets cannot be negative'
      }
    },
    ticketsBooked: {
      type: Number,
      required: true,
      validate: [
        {
          validator: function (value: number) {
            return value >= 0
          },
          message: 'Tickets booked cannot be negative'
        }
      ]
    }
  },
  { timestamps: true }
)

const EventsModel = model<EventsDocument>('Events', eventsSchema)

export default EventsModel
