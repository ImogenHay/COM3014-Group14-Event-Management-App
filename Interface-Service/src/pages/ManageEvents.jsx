import {deleteEvent, getAllUsersEvents} from '../api/event_management_service_api.jsx';
import {useEffect, useState} from 'react';
import {Alert, AlertIcon, Badge, Box, Button, Flex, Grid, GridItem, Heading, HStack, Text,} from '@chakra-ui/react';

// Simple trick to trigger a homepage refresh from the remainder of the app.
export let refreshHomepage;

export default function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    let [homepageKey, setHomepageKey] = useState(0);
    refreshHomepage = () => {
        setHomepageKey(homepageKey => homepageKey + 1);
    }

    useEffect(() => {
        async function fetchEvents() {

            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;

            const events = await getAllUsersEvents(token);
            if (events === null) {
                setError('404 Could not connect to Events Service');
            } else {
                setEvents(events);
            }
        }

        fetchEvents();
    }, [homepageKey]);


    const handleDeleteClick = async (eventId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        const availableTickets = await deleteEvent(eventId, token);
        if (availableTickets === null) {
            setError('404 Could delete event');
        }
        refreshHomepage();
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
                    My Events
                </Heading>
                <Alert status="error">
                    <AlertIcon/>
                    {error}
                </Alert>
            </Box>
        );
    }


    return (
        <Box p={4}>
            <Heading as="h1" size="2xl" mb={4}>
                My Events
            </Heading>
            <Grid
                templateColumns={{base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}}
                gap={6}
            >
                {events.map((event) => (
                    <GridItem key={event._id}>
                        <Box borderWidth="2px" borderRadius="lg" p={4}>
                            <Heading as="h2" size="md" mb={2}>
                                {event.name}
                            </Heading>
                            <Text mb={2} wordBreak="break-word" whiteSpace="pre-wrap"
                                  dangerouslySetInnerHTML={{__html: padDescription(event.description)}}></Text>
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
                            <HStack mb={2}>
                                <Badge colorScheme="purple">Price</Badge>
                                <Text>£ {event.ticketPrice}</Text>
                            </HStack>
                            <Flex alignItems="center" justifyContent="space-between" mb={2}>
                                <Button colorScheme="red" onClick={() => handleDeleteClick(event._id)}>
                                    Delete
                                </Button>
                            </Flex>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}