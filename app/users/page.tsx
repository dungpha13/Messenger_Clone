'use client';

import EmptyState from '../components/EmptyState';
import { Box } from '@chakra-ui/react';

const Users = () => {

    return (
        <Box
            display='flex'
            minH='full'
            minW='full'
            pl={80}
        >
            <EmptyState />
        </Box>
    );
}

export default Users;