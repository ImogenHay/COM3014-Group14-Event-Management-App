import { getAllEvents } from '../api';
import {useEffect, useState} from "react";

import { Box, Heading, Button } from "@chakra-ui/react";

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
            <Box p={4}>
                <Heading as="h1" size="2xl" mb={4}>
                    Events
                </Heading>
            </Box>
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
