import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export default function About() {
    // TODO: delete this example (start)
    // Fetch the location information from React Router.
    const location = useLocation();

    // useEffect is just used here to stop the alert dialog being
    // spammed. It might not be needed.
    useEffect(() => {
        // TODO: delete (example for getting the state).
        console.log(JSON.stringify(location.state));
    }, []);
    // TODO: delete this example (end)

    return (
        <Box maxW="700px" mx="auto" px={4} py={8}>
            <Heading as="h2" size="xl" textAlign="center" mb={6}>
                About TechFusion Events
            </Heading>
            <Text fontSize="lg" mb={4}>
                Events are a crucial aspect of professional development and networking
                in the technology industry. However, with so many events happening at
                the same time and in different locations, it can be difficult for
                individuals to find and manage relevant events. This is especially
                challenging for individuals who are new to the industry or who are
                looking to expand their network. Traditional methods of event discovery,
                such as online searches and social media, are often time-consuming and
                unreliable. Existing event management apps include many categories so
                it can be difficult to browse for potentially interesting tech related
                events without knowing exactly what you are searching for.
            </Text>
            <Text fontSize="lg" mb={6}>
                To address this problem, TechFusion Events aims to streamline event
                discovery and management for technology professionals. Our app
                provides a centralized platform for users to discover and book to events
                based on their interests.
            </Text>
            <Box w="full">
                <Heading as="h2" size="lg" mb={3}>
                    Meet the Creators
                </Heading>
                <VStack spacing={5} align="center">
                    <Box>
                        <Heading as="h3" size="md" mb={1}>
                            Imogen Hay
                        </Heading>
                        <Text fontSize="lg">Events Team</Text>
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={1}>
                            Aimilios Solomonides
                        </Heading>
                        <Text fontSize="lg">Events Team</Text>
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={1}>
                            Ramandeep Singh
                        </Heading>
                        <Text fontSize="lg">Ticketing & Payments Team</Text>
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={1}>
                            Navnath Hande
                        </Heading>
                        <Text fontSize="lg">Ticketing & Payments Team</Text>
                    </Box>
                    <Box>
                        <Heading as="h3" size="md" mb={1}>
                            Dominik Radomski
                        </Heading>
                        <Text fontSize="lg">Authentication Team</Text>
                    </Box>
                </VStack>
            </Box>
        </Box>
    );
}