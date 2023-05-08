import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    addTickets,
    bookTickets,
    checkAvailableTickets,
    processPayment
} from '../api/event_management_api.jsx';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Stack,
    Text,
} from "@chakra-ui/react";
import {refreshHomepage} from "./Home.jsx";

const stripePromise = loadStripe("pk_test_51MwkwTIU0773awQBHPLIYmajUZ8UT9TtGn7zQjd6kKNLgGSUdu5Andy7wkjit53KJg61vLZSmcyYrRcPhgs5WsfH00QsTyxKkR");

function CheckoutForm() {

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const [eventDetails, setEventDetails] = useState(null);
    const [error, setError] = useState(null); // Added a state for handling errors
    const [tickets, setTickets] = useState(null)
    useEffect(() => {
        if (location.state && location.state.eventDetails) {
            setEventDetails(location.state.eventDetails);
            const eventDetails = location.state.eventDetails;
            const { eventId, eventName, venue, numOfTickets, date } = eventDetails;
        }
        const fetchData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
        };
        fetchData();
    }, [location.state]);

    if (!eventDetails) {
        return (
            <Box maxWidth="600px" mx="auto" my={8} p={4}>
                <Text fontSize="3xl" fontWeight="bold" mb={4}>
                    Error: No event details found
                </Text>
            </Box>
        );
    }

    const totalPrice = eventDetails.numOfTickets * eventDetails.ticketPrice;
    const cur='gbp';
    const to='tok_visa';
    const handlePlaceOrderClick = async () => {
        setError(null); // Reset the error state before attempting a new payment
        if (totalPrice === 0) { // Check if total price is zero
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const email=user.email;
            setEventDetails(location.state.eventDetails);
            const eventDetails = location.state.eventDetails;
            const { eventId,eventName, venue, numOfTickets, date } = eventDetails;
            const availableTickets = await checkAvailableTickets(eventId, token);
            if (availableTickets === null) {
                setError('404 Could not connect to Events Service');
            } else {
                if (availableTickets >= numOfTickets) {

                    const booked = await bookTickets(eventId, numOfTickets, token);
                    // alert(booked);

                    if (booked) {
                        alert(`Successfully booked ${numOfTickets} tickets for event ${eventId}`); //TODO make UI element and make sure events list updates after booking
                        refreshHomepage();
                        const ticket = {
                            event: eventName,
                            venue: venue,
                            tickets: numOfTickets,
                            date: date,
                            price: totalPrice,
                            email:email,
                        };
                        // Add ticket to database
                        const newTicket = await addTickets(ticket, token);
                        if (newTicket) {
                            navigate('/tickets', {state: {ticket: {token}}});
                        }
                        else{
                            alert("Tickets data not entered.")
                        }

                    } else {
                        alert(`Failed to book ${numOfTickets} tickets for event ${eventId}`);
                    }
                } else {
                    alert(`Only ${availableTickets} tickets are available for event ${eventId}`);
                    }
                }
            }
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { tok, error } = await stripe.createToken(cardElement);

        if (error) {
            console.log("Error creating token:", error);
            setError(error.message); // Set the error message if token creation fails
        } else {
            const payment = {
                amount: totalPrice,
                currency: cur,
                source: to,
            };

            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user.token;
                const userId=user._id

                const success = await processPayment(payment,token);

                if (success) {
                    alert("Payment successful!");
                    const user = JSON.parse(localStorage.getItem('user'));
                    const token = user.token;
                    const email=user.email;
                    setEventDetails(location.state.eventDetails);
                    const eventDetails = location.state.eventDetails;
                    const { eventName, venue, numOfTickets, date } = eventDetails;

                    const ticket = {
                        event: eventName,
                        venue: venue,
                        tickets: numOfTickets,
                        date: date,
                        price: totalPrice,
                        email:email,
                    };

                    const {eventId} = eventDetails;
                    const availableTickets = await checkAvailableTickets(eventId, token);
                    if (availableTickets === null) {
                        setError('404 Could not connect to Events Service');
                    } else {
                        if (availableTickets >= numOfTickets) {

                            const booked = await bookTickets(eventId, numOfTickets, token);
                            if (booked) {
                                alert(`Successfully booked ${numOfTickets} tickets for event ${eventId}`);
                                // Add ticket to database
                                const newTicket = await addTickets(ticket, token);
                                if (newTicket) {
                                    navigate('/tickets', {state: {ticket: {token}}});
                                }
                                else{
                                    alert("Tickets data not entered.")
                                }
                                refreshHomepage();
                            } else {
                                alert(`Failed to book ${numOfTickets} tickets for event ${eventId}`);
                            }
                        } else {
                            alert(`Only ${availableTickets} tickets are available for event ${eventId}`);
                        }
                    }



                } else {
                    alert("Payment failed, Please try Again.");
                }
            } catch (e) {
                alert(e)
            }
        }
    };

    return (
        <Box maxWidth="600px" mx="auto" my={8} p={4}>
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
                Checkout
            </Text>
            <Stack spacing={4}>
                <Text fontSize="xl">
                    Event: {eventDetails.eventName}
                </Text>
                <Text fontSize="xl">
                    Venue: {eventDetails.venue}
                </Text>
                <Text fontSize="xl">
                    Date: {eventDetails.date}
                </Text>
                <Text fontSize="xl">
                    Number of tickets: {eventDetails.numOfTickets}
                </Text>
                <Text fontSize="xl">
                    Total price: £ {totalPrice}
                </Text>
                <FormControl id="card-element">
                    <FormLabel>Card details</FormLabel>
                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
                    </div>
                </FormControl>
                <Button colorScheme="blue" onClick={handlePlaceOrderClick} disabled={!stripe}>Place order</Button>
                {error && <Text color="red.500">{error}</Text>} {/* Display error message if there's an error */}
            </Stack>
        </Box>
    );
}

function CheckoutPage() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default CheckoutPage;