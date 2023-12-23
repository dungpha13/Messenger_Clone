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
            hidden={isOpen}
            display='block'
        >
            <EmptyState />
        </Box>
    );
}

export default Home;