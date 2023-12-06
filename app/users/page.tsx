'use client';

import EmptyState from '../components/EmptyState';
import { Box } from '@chakra-ui/react';

const Users = () => {

    return (
        <Box
            display='flex'
            h='full'
            w='full'
        // pl={80}
        >
            <EmptyState />
        </Box>
    );
}

export default Users;