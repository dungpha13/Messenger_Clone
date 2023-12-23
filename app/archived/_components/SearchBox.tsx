'use client';

import UserAvatar from "@/app/components/UserAvatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import { AvatarGroup, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface SearchBoxProps {
    conversation: FullConversationType;
}

const SearchBox = ({
    conversation
}: SearchBoxProps) => {

    const router = useRouter();
    const otherUser = useOtherUser(conversation);

    const bgColor = useColorModeValue('gray.200', 'gray.500');

    const handleClick = useCallback(() => {
        router.push(`/conversations/${conversation.id}`)
    }, [conversation.id, router]);

    return (
        <Stack
            p={3}
            h={16}
            w='full'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            cursor='pointer'
            rounded='lg'
            _hover={{
                bg: `${bgColor}`
            }}
            onClick={handleClick}
        >
            <Stack w='full' direction='row' alignItems='center' spacing={3} >
                {conversation.isGroup ? (
                    <AvatarGroup size='sm' max={1}>
                        {conversation.users.map((user) => (
                            <UserAvatar key={user.id} size="sm" user={user} />
                        ))}
                    </AvatarGroup>
                ) : (
                    <UserAvatar size="sm" user={otherUser} />
                )}
                <Text fontSize='sm' as='b'>{conversation.name}</Text>
            </Stack>
        </Stack>
    );
}

export default SearchBox;