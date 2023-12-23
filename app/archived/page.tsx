'use client';

import { Box } from "@chakra-ui/react";
import EmptyState from "../components/EmptyState";

const Page = () => {

    // const {isOpen} = useArchived();

    return (
        <Box
            h='full'
            w='full'
            // hidden={isOpen}
            display='block'
        >
            <EmptyState />
        </Box>
    );
}

export default Page;