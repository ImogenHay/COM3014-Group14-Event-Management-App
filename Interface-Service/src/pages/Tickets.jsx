import { getTicketsById } from '../api/event_management_api.jsx';
import { Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
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
    Alert,
    AlertIcon,
} from '@chakra-ui/react';

export default function Tickets() {
    const [tickets, setTickets] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const ticketId = user.userId;
            const tickets = await getTicketsById(ticketId, token);
            setTickets(tickets);
        };
        fetchData();
    }, []);

    const sortTickets = (tickets) => {
        if (sortBy === 'tickets') {
            return [...tickets].sort((a, b) => b.tickets - a.tickets);
        } else if (sortBy === 'date') {
            return [...tickets].sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            return tickets;
        }
    };

    return (
        <div>
            <Box p={4}>
                <Heading as="h1" size="2xl" mb={4}>
                    Tickets
                </Heading>
                <HStack spacing={4}>
                    <Badge
                        variant={sortBy === 'tickets' ? 'solid' : 'outline'}
                        onClick={() => setSortBy('tickets')}
                        cursor="pointer"
                    >
                        Sort by number of tickets
                    </Badge>
                    <Badge
                        variant={sortBy === 'date' ? 'solid' : 'outline'}
                        onClick={() => setSortBy('date')}
                        cursor="pointer"
                    >
                        Sort by date of tickets
                    </Badge>
                </HStack>
            </Box>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} p={4}>
                {sortTickets(tickets).map((ticket) => (
                    <GridItem key={ticket.userId}>
                        <Box borderWidth="1px" borderRadius="lg" p={4} bg="#E9D8FD">
                            <Heading as="h2" size="md" mb={2}>
                                {ticket.event}
                            </Heading>
                            <Text mb={2}>Venue: {ticket.venue}</Text>
                            <Text mb={2}>Number of Tickets: {ticket.tickets}</Text>
                            <Text mb={2}>Price: £{ticket.price}</Text>
                            <Text mb={2}>
                                Date: {new Date(ticket.date).toLocaleDateString()}
                            </Text>
                            <Text mb={2}>Booked on: {new Date(ticket.booked).toLocaleDateString()}</Text>
                            <Text mb={2}>Ticket ID: {ticket._id}</Text>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
}
