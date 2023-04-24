import { getAllEvents } from '../api';
import {useEffect, useState} from "react";

export default function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const events = await getAllEvents();
            setEvents(events);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Events</h1>
            {events.map((event) => (
                <div key={event.eventId}>
                    <h2>{event.name}</h2>
                    <p>{event.description}</p>
                    <p>Venue: {event.venue}</p>
                    <p>Date: {event.date}</p>
                    <p>Duration: {event.duration} hours</p>
                    <p>Available Tickets: {event.availableTickets}</p>
                </div>
            ))}
        </div>
    );
}
