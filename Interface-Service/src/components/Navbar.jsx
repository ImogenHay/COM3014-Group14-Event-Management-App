import React from "react";
import { Flex, Spacer, Text, Link, Button } from "@chakra-ui/react";

export default function Navbar() {
    return (
        <Flex bg="purple.900" color="white" p={4} alignItems="center">
            <Link href="/" mr={8}>
                <Text fontSize="2xl" fontWeight="bold">
                    Home
                </Text>
            </Link>

            <Spacer />

            <Link href="/Tickets" mr={8}>
                <Text fontSize="lg" fontWeight="bold">
                    My Tickets
                </Text>
            </Link>

            <Link href="/About" mr={8}>
                <Text fontSize="lg" fontWeight="bold">
                    About
                </Text>
            </Link>

            <Button colorScheme="red" href="/Authorise">
                Log Out
            </Button>
        </Flex>
    );
}
