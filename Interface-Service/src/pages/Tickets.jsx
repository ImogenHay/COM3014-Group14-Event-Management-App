import { getTicketsById } from '../api/event_management_service_api.jsx';
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
import NewButtonForm from '../components/NewEventForm.jsx';

export default function Tickets() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const ticketId=user.userId;
            const tickets = await getTicketsById(ticketId,token);
            setTickets(tickets);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Box p={4}>
                <Heading as="h1" size="2xl" mb={4}>
                    Tickets
                </Heading>
            </Box>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} p={4}>
                {tickets.map((ticket) => (
                    <GridItem key={ticket.userId}>
                        <Box borderWidth="1px" borderRadius="lg" p={4}>
                            <Heading as="h2" size="md" mb={2}>
                                {ticket.event}
                            </Heading>
                            <Text mb={2}>Venue: {ticket.venue}</Text>
                            <Text mb={2}>Number of Tickets: {ticket.tickets}</Text>
                            <Text mb={2}>Price: £{ticket.price}</Text>
                            <Text mb={2}>Date: {new Date(ticket.date).toLocaleDateString()}</Text>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
}
