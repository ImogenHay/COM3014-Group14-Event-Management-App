import { type Document, model, Schema } from 'mongoose'

export interface EventsInput {
  name: string
  description: string
  venue: string
  date: Date
  duration: number
  availableTickets: number
  ticketPrice: number
  userId: string
}

export interface EventsDocument extends EventsInput, Document {
  createdAt: Date
  updatedAt: Date

}

const eventsSchema: Schema = new Schema(
  {
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
      required: true,
      validate: {
        validator: function (value: number) {
          return value > 0
        },
        message: 'Duration must be positive'
      }
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
    ticketPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value >= 0
        },
        message: 'Ticket price cannot be negative'
      }
    },
    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const EventsModel = model<EventsDocument>('Events', eventsSchema)

export default EventsModel
