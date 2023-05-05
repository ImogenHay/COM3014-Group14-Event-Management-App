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


export default function Checkout() {


    return (
        <div>
            <Box p={4}>
                <Heading as="h1" size="2xl" mb={4}>
                    Checkout
                </Heading>
            </Box>

        </div>
    );
}
