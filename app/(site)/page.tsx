"use client";

import { Box, Container, Image, Text } from "@chakra-ui/react";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
        <Container
            display="flex"
            minH="full"
            minW="full"
            flexDir="column"
            bg="gray.100"
            justifyContent="center"
            centerContent
        >
            <Box
                mx="auto"
                w="full"
                maxW="md"
            >
                <Image
                    alt="Logo"
                    height="48px"
                    width="48px"
                    src="/images/logo.png"
                    mx="auto"
                    w="auto"
                />
                <Text
                    mt={6}
                    textAlign="center"
                    fontSize='3xl'
                    fontWeight="bold"
                    color="gray.900"
                >
                    Sign in to your account
                </Text>
            </Box>
            <AuthForm />
        </Container>
    )
}
