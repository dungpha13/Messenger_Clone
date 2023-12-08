'use client';

import UserAvatar from "@/app/components/UserAvatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { Conversation, User } from "@prisma/client";
import { DotsThreeOutline } from "phosphor-react";
import { useMemo } from "react";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation);
    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active'

    }, [conversation])

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            borderBottom='1px'
            borderColor='gray.200'
            p={4}
            w='full'
            h='60px'
        >
            <Stack direction='row' alignItems='center' spacing={3}>
                <UserAvatar size="sm" user={otherUser} />
                <Stack spacing={0}>
                    <Text
                        fontSize='md'
                        fontWeight='bold'>
                        {conversation.name || otherUser.name}
                    </Text>
                    <Text
                        fontSize='x-small'
                        color='gray.700'>
                        {statusText}
                    </Text>
                </Stack>
            </Stack>
            <Icon
                cursor='pointer'
                boxSize={6}
                as={DotsThreeOutline}
                onClick={() => { }}
            />
        </Stack>
    );
}

export default Header;