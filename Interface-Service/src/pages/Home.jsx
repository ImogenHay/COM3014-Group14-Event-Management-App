import {getAllEvents, checkAvailableTickets, bookTickets} from '../api/event_management_service_api.jsx';
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
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    Alert, AlertIcon,
} from '@chakra-ui/react';
import NewButtonForm from "../components/NewEventForm.jsx";

export default function Home() {
    const [events, setEvents] = useState([]);
    const [numOfTickets, setNumOfTickets] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchEvents() {

            const events = await getAllEvents();
            if (events === null) {
                setError('404 Could not connect to Events Service');
            } else {
                setEvents(events);
            }
        }
        fetchEvents();
    }, []);



    const handleBookClick = async (eventId) => {
        const availableTickets = await checkAvailableTickets(eventId);
        if (availableTickets === null) {
            setError('404 Could not connect to Events Service');
        } else {
            if (availableTickets >= numOfTickets) {
                //TODO Call ticket service and payment service
                const booked = await bookTickets(eventId, numOfTickets);
                if (booked) {
                    alert(`Successfully booked ${numOfTickets} tickets for event ${eventId}`); //TODO make UI element and make sure events list updates after booking
                } else {
                    alert(`Failed to book ${numOfTickets} tickets for event ${eventId}`);
                }
            } else {
                alert(`Only ${availableTickets} tickets are available for event ${eventId}`);
            }
        }
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

    const formatDuration = (duration) => {
        if (duration < 1) {
            return `${duration * 60} minutes`;
        } else if (duration > 24) {
            const days = Math.floor(duration / 24);
            const hours = duration % 24;
            return `${days} ${days > 1 ? 'days' : 'day'} ${hours} ${hours > 1 ? 'hours' : 'hour'}`;
        } else {
            return `${duration} ${duration > 1 ? 'hours' : 'hour'}`;
        }
    }

    // find the length of the longest description
    const maxLength = Math.max(...events.map((event) => event.description.length));

    function padDescription(description) {
        console.log(description + maxLength)
        const descriptionLength = description.length;
        if (descriptionLength < maxLength) {
            description = description + ' &nbsp;'
            const numSpacesToAdd = maxLength - descriptionLength;
            const spaces = '&nbsp;'.repeat(numSpacesToAdd);
            return `${description}${spaces}`;
        }
        return description;
    }

    if (error) {
        return (
            <Box p={4}>
                <Heading as="h1" size="2xl" mb={4}>
                    Events
                </Heading>
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            </Box>
        );
    }


    return (
        <Box p={4}>
            <Heading as="h1" size="2xl" mb={4}>
                Events
            </Heading>
            <NewButtonForm mb={10}/>
            <Grid
                templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={6}
            >
                {events.map((event) => (
                    <GridItem key={event._id}>
                        <Box borderWidth="2px" borderRadius="lg" p={4}>
                            <Heading as="h2" size="md" mb={2}>
                                {event.name}
                            </Heading>
                            <Text mb={2} wordBreak="break-word" whiteSpace="pre-wrap"  dangerouslySetInnerHTML={{ __html: padDescription(event.description) }}></Text>
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
                            <Flex alignItems="center" justifyContent="space-between" mb={2}>
                                <NumberInput size="md" defaultValue={1} min={1} max={event.availableTickets} onChange={(value) => setNumOfTickets(parseInt(value))} isDisabled={event.availableTickets === 0}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {event.availableTickets === 0 ? (
                                    <Button colorScheme="purple" isDisabled={true}>
                                        Unavailable
                                    </Button>
                                ) : (
                                    <Button colorScheme="purple" onClick={() => handleBookClick(event._id)}>
                                        Book Tickets
                                    </Button>
                                )}
                            </Flex>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}