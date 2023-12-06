'use client';

import UserAvatar from "@/app/components/UserAvatar";
import useRoutes from "@/app/hooks/useRoutes";
import { Avatar, Box, Button, Stack, Text } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast';

interface UserBoxProps {
    user: User
}

const UserBox: React.FC<UserBoxProps> = ({
    user
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = useCallback(async () => {
        setIsLoading(true)

        await axios.post('api/conversations', {
            userId: user.id
        })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`)
            })
            // .catch((err) => {
            //     toast.error('Internal Error')
            // })
            .finally(() => setIsLoading(false))

    }, [user, router])

    return (
        <Stack
            p={3}
            height='48px'
            direction='row'
            alignItems='center'
            cursor='pointer'
            rounded='lg'
            spacing={3}
            _hover={{
                bg: 'gray.200'
            }}
            onClick={handleClick}
        >
            <UserAvatar size="sm" user={user} />
            <Text fontSize='sm' as='b'>{user.name}</Text>
        </Stack>
    );
}

export default UserBox;