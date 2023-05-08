import {useState} from 'react';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex, useToast, InputRightElement, InputGroup, InputLeftElement,
} from "@chakra-ui/react";
import {createEvent} from "../api/event_management_api.jsx";
import {refreshHomepage} from "../pages/Home.jsx";
import {CheckIcon} from "@chakra-ui/icons";

export default function NewEventForm({ buttonProperties }) {
    const {isOpen, onOpen: onOpenDrawer, onClose: onCloseDrawer} = useDisclosure();
    const [formData, setFormData] = useState({});

    const toast = useToast();

    // calculating tomorrow's date
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];


    // Workaround to clear the form on open.
    const onOpen = () => {
        setFormData({});
        onOpenDrawer();
    }

    // Workaround to make drawer not block page after close.
    const onClose = () => {
        onCloseDrawer();
        // document.querySelector('.chakra-portal:last-of-type').remove();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        console.log(`todo ${JSON.stringify(formData)}`);
        if (await createEvent(formData, token)) {
            // alert(`todo ${JSON.stringify(formData)}`);


            refreshHomepage();
            setFormData({});

            toast({
                title: 'Event Created',
                description: 'Your event was created successfully.',
                status: 'success',
                isClosable: true,
                duration: 3000
            });
            onClose();
        } else {
            // do something to show error
            alert('There was a problem. Please wait and try again.');
        }
    };

    const onChangeHTML = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onChangeChakra = (name, formatter) => (value) => {
        onChangeHTML({target: {name, value: formatter ? formatter(value) : value}});
    }

    return (
        <>
            <Button {...buttonProperties} onClick={onOpen}>Create Event</Button>

            <Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
                <DrawerOverlay/>
                <DrawerContent>

                    <DrawerCloseButton/>
                    <DrawerHeader>New Event</DrawerHeader>
                    <DrawerBody>

                        <form id='new-event-form' onSubmit={handleSubmit}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" name="name" onChange={onChangeHTML} value={formData.name || ''} required/>
                            </FormControl>
                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="description" onChange={onChangeHTML} value={formData.description || ''} required/>
                            </FormControl>
                            <FormControl id="venue" isRequired>
                                <FormLabel>Venue</FormLabel>
                                <Input type="text" name="venue" onChange={onChangeHTML} value={formData.venue || ''} required/>
                            </FormControl>
                            <FormControl id="date" isRequired>
                                <FormLabel>Date</FormLabel>
                                <Input type="date" name="date" onChange={onChangeHTML} min={formattedDate} value={formData.date || ''} required/>
                            </FormControl>
                            <FormControl id="availableTickets" isRequired>
                                <FormLabel>Number of Available Tickets</FormLabel>
                                <NumberInput min={0} onChange={onChangeChakra('availableTickets', parseInt)} value={formData.availableTickets || ''} required>
                                    <NumberInputField required />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="ticketPrice" isRequired>
                                <FormLabel>Price per Ticket (in pounds £)</FormLabel>
                                <NumberInput min={0} onChange={onChangeChakra('ticketPrice', parseInt)} value={formData.ticketPrice || ''} required>
                                    <NumberInputField required />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="duration" isRequired>
                                <FormLabel>Duration (in hours)</FormLabel>
                                <NumberInput min={0} onChange={onChangeChakra('duration', parseInt)} value={formData.duration || ''} required>
                                    <NumberInputField required />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <Flex justify="flex-end">
                                <Button mt={4} type='submit' form='new-event-form' variant='solid' colorScheme='blue'>
                                    Create
                                </Button>
                            </Flex>
                        </form>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    );
}
