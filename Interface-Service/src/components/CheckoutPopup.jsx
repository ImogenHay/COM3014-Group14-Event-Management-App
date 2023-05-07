import { useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Textarea,
} from "@chakra-ui/react";

const CheckoutPopup = ({ isOpen, onClose, product }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        paymentMethod: "creditCard",
        rememberMe: false,
        comments: "",
    });

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Checkout</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Stack spacing="6">
                            <FormControl id="name">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>

                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </FormControl>

                            <FormControl id="address">
                                <FormLabel>Address</FormLabel>
                                <Textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    resize="none"
                                    required
                                />
                            </FormControl>

                            <FormControl as="fieldset">
                                <FormLabel as="legend">Payment Method</FormLabel>
                                <Stack spacing="4">
                                    <Checkbox
                                        name="paymentMethod"
                                        value="creditCard"
                                        isChecked={formData.paymentMethod === "creditCard"}
                                        onChange={handleChange}
                                    >
                                        Credit Card
                                    </Checkbox>
                                    <Checkbox
                                        name="paymentMethod"
                                        value="paypal"
                                        isChecked={formData.paymentMethod === "paypal"}
                                        onChange={handleChange}
                                    >
                                        PayPal
                                    </Checkbox>
                                </Stack>
                            </FormControl>

                            <FormControl id="rememberMe">
                                <Checkbox
                                    name="rememberMe"
                                    isChecked={formData.rememberMe}
                                    onChange={handleChange}
                                >
                                    Remember me
                                </Checkbox>
                            </FormControl>

                            <FormControl id="comments">
                                <FormLabel>Comments</FormLabel>
                                <Textarea
                                    name="comments"
                                    value={formData.comments}
                                    onChange={handleChange}
                                    resize="none"
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" colorScheme="blue" ml={3}>
                            Buy Now
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default CheckoutPopup;
