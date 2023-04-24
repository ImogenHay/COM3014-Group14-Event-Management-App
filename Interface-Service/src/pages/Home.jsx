import { getAllEvents } from '../api/event_management_service_api.jsx';
import { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    HStack,
    Badge,
    Button,
    Grid,
    GridItem,
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

    function handleBookClick(eventId) {
        // handle booking event
        console.log(eventId);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-GB', options);
    }

    function formatDuration(duration) {
        const units = ['seconds', 'minutes', 'hours', 'days', 'weeks'];
        const divisors = [60, 60, 24, 7];
        let value = duration;
        let unit = 'hours';
        for (let i = 2; i < divisors.length + 2; i++) {
            const divisor = divisors[i - 2];
            if (value < divisor) {
                break;
            }
            value /= divisor;
            unit = units[i];
        }
        return `${Math.floor(value)} ${unit}`;
    }

    return (
        <Box p={4}>
            <Heading as="h1" size="2xl" mb={4}>
                Events
            </Heading>
            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={6}
            >
                {events.map((event) => (
                    <GridItem key={event._id}>
                        <Box borderWidth="1px" borderRadius="lg" p={4}>
                            <Heading as="h2" size="md" mb={2}>
                                {event.name}
                            </Heading>
                            <Text mb={2}>{event.description}</Text>
                            <HStack mb={2}>
                                <Badge colorScheme="purple">Venue</Badge>
                                <Text>{event.venue}</Text>
                            </HStack>
                            <HStack mb={2}>
                                <Badge colorScheme="purple">Date</Badge>
                                <Text>{formatDate(event.date)}</Text>
                            </HStack>
                            <HStack mb={2}>
                                <Badge colorScheme="purple">Duration</Badge>
                                <Text>{formatDuration(event.duration)}</Text>
                            </HStack>
                            <HStack mb={2}>
                                <Badge colorScheme="purple">Available Tickets</Badge>
                                <Text>{event.availableTickets}</Text>
                            </HStack>
                            <Button colorScheme="purple" onClick={() => handleBookClick(event._id)}>
                                Book Tickets
                            </Button>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}
