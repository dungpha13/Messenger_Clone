'use client';

import UserAvatar from "@/app/components/UserAvatar";
import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface UserBoxProps {
    user: User
}

const UserBox: React.FC<UserBoxProps> = ({
    user
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const bgColor = useColorModeValue('gray.200', 'gray.500')

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
            h='48px'
            direction='row'
            alignItems='center'
            cursor='pointer'
            rounded='lg'
            spacing={3}
            _hover={{
                bg: `${bgColor}`
            }}
            onClick={handleClick}
        >
            <UserAvatar size="sm" user={user} />
            <Text fontSize='sm' as='b'>{user.name}</Text>
        </Stack>
    );
}

export default UserBox;