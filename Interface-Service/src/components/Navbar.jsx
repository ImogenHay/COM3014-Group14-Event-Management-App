import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Flex, Spacer, Text, Link, Button } from "@chakra-ui/react";
import { useLogout } from '../hooks/useLogout'


export default function Navbar() {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
    }

    return (
        <Flex bg="purple.900" color="white" p={4} alignItems="center">
            <Link as={ReactRouterLink} to="/" mr={8}>
                <Text fontSize="2xl" fontWeight="bold">
                    Home
                </Text>
            </Link>

            <Spacer />

            <Link as={ReactRouterLink} to="/ManageEvents" mr={8}>
                <Text fontSize="lg" fontWeight="bold">
                    Manage Events
                </Text>
            </Link>

            <Link as={ReactRouterLink} to="/Tickets" mr={8}>
                <Text fontSize="lg" fontWeight="bold">
                    My Tickets
                </Text>
            </Link>

            <Link as={ReactRouterLink} to="/About" mr={8}>
                <Text fontSize="lg" fontWeight="bold">
                    About
                </Text>
            </Link>

            <Button colorScheme="red" onClick={handleClick}>
                Log Out
            </Button>
        </Flex>
    );
}
