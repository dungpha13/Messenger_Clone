'use client';

import { Box, Spinner } from "@chakra-ui/react";

const LoadingModal = () => {
    return (
        <Box
            w='full'
            h='full'
            display='flex'
            justifyContent='center'
        >
            <Spinner size='xl' />
        </Box>
    );
}

export default LoadingModal;