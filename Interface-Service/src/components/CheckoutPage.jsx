import React, { useState } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import {processPayment} from "../api/event_management_service_api.jsx";




const stripePromise = loadStripe('pk_live_51MugIHKUS8Nbzq3cbIOTeKRtghgKwSlj809Q2rMR7fYunSoAGfi2n1UOjqixwyX6AIi9jqrVBsCIBGyCEoGJcvZR00uFjeBN0X');




function CheckoutForm() {
    const [email, setEmail] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast();



    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!stripe || !elements) {
            return;
        }



        const cardElement = elements.getElement(CardElement);



        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { email },
        });



        if (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
            });
        } else {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const paymentSuccess = await processPayment(payment, token);



            if (paymentSuccess) {
                toast({
                    title: 'Success',
                    description: 'Payment successful!',
                    status: 'success',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Payment failed. Please try again.',
                    status: 'error',
                });
            }
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Card Information</FormLabel>
                    <CardElement />
                </FormControl>
                <Button type="submit" colorScheme="blue" isDisabled={!stripe}>
                    Pay
                </Button>
            </VStack>
        </form>
    );
}



export default function CheckoutPage() {
    return (
        <Box p={4}>
            <Heading as="h1" size="2xl" mb={4}>
                Checkout
            </Heading>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </Box>
    );
}