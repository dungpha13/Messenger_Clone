'use client';

import { Box, Stack, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
    users: User[]
}

const UserList: React.FC<UserListProps> = ({
    users
}) => {

    return (
        <Box
            h='full'
            w='400px'
            display='flex'
            flexDirection='column'
            p={4}
            boxShadow='3px 0px 5px rgba(0, 0, 0, 0.1)'
        >
            <Stack spacing={2}>
                <Stack>
                    <Text as='b' fontSize='2xl'>People</Text>
                </Stack>
                <Stack spacing={2}>
                    {users.map((el) => (
                        <UserBox key={el.id} user={el} />
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default UserList;