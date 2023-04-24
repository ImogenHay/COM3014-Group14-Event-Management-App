import { getAllEvents } from '../api';
import { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Badge,
    Button,
} from '@chakra-ui/react';

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
        <Box p={4}>
            <Heading as="h1" size="2xl" mb={4}>
                Events
            </Heading>
            <VStack spacing={8} align="stretch">
                {events.map((event) => (
                    <Box key={event.eventId} borderWidth="1px" borderRadius="lg" p={4}>
                        <Heading as="h2" size="lg" mb={2}>
                            {event.name}
                        </Heading>
                        <Text mb={2}>{event.description}</Text>
                        <HStack mb={2}>
                            <Badge colorScheme="purple">Venue</Badge>
                            <Text>{event.venue}</Text>
                        </HStack>
                        <HStack mb={2}>
                            <Badge colorScheme="purple">Date</Badge>
                            <Text>{event.date}</Text>
                        </HStack>
                        <HStack mb={2}>
                            <Badge colorScheme="purple">Duration</Badge>
                            <Text>{event.duration} hours</Text>
                        </HStack>
                        <HStack mb={2}>
                            <Badge colorScheme="purple">Available Tickets</Badge>
                            <Text>{event.availableTickets}</Text>
                        </HStack>
                        <Button colorScheme="purple">Book Tickets</Button>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
}
