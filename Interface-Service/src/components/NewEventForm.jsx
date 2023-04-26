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
    Flex,
} from "@chakra-ui/react";
import {createEvent} from "../api/event_management_service_api.jsx";

export default function NewEventForm({}) {
    const {isOpen, onOpen, onClose: onCloseDrawer} = useDisclosure();
    const [formData, setFormData] = useState({});

    // Workaround to make drawer not block page after close.
    const onClose = () => {
        onCloseDrawer();
        // document.querySelector('.chakra-portal:last-of-type').remove();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // await createEvent(formData);

        alert(`todo ${JSON.stringify(formData)}`);
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <>
            <Button onClick={onOpen}>New Event</Button>

            <Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
                <DrawerOverlay/>
                <DrawerContent>

                    <DrawerCloseButton/>
                    <DrawerHeader>New Event</DrawerHeader>
                    <DrawerBody>

                        <form id='new-event-form' onSubmit={handleSubmit}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" name="name" onChange={handleInputChange} required/>
                            </FormControl>
                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="description" onChange={handleInputChange} required/>
                            </FormControl>
                            <FormControl id="venue" isRequired>
                                <FormLabel>Venue</FormLabel>
                                <Input type="text" name="venue" onChange={handleInputChange} required/>
                            </FormControl>
                            <FormControl id="date" isRequired>
                                <FormLabel>Date</FormLabel>
                                <Input type="date" name="date" onChange={handleInputChange} required/>
                            </FormControl>
                            <FormControl id="num-tickets" isRequired>
                                <FormLabel>Number of Tickets</FormLabel>
                                <NumberInput min={0} name="numTickets" onChange={handleInputChange} required>
                                    <NumberInputField/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl id="duration" isRequired>
                                <FormLabel>Duration (in minutes)</FormLabel>
                                <NumberInput min={0} name="duration" onChange={handleInputChange} required>
                                    <NumberInputField/>
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
