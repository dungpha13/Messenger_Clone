'use client';

import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";
import { Box } from "@chakra-ui/react";

const Home = () => {
    const { isOpen } = useConversation();

    return (
        <Box
            h='full'
            w='full'
            display={isOpen ? 'block' : 'hidden'}
        >
            <EmptyState />
        </Box>
    );
}

export default Home;