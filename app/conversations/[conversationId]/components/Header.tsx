'use client';

import UserAvatar from "@/app/components/UserAvatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { AvatarGroup, Box, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Conversation, User } from "@prisma/client";
import { DotsThreeOutline } from "phosphor-react";
import { useMemo } from "react";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const otherUser = useOtherUser(conversation);

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active'

    }, [conversation])

    return (
        <Stack
            p={4}
            h='60px'
            w='full'
            direction='row'
            alignItems='center'
            boxShadow='0px 2px 5px rgba(0, 0, 0, 0.2)'
            justifyContent='space-between'
        >
            <Stack direction='row' alignItems='center' spacing={3}>
                {conversation.isGroup ? (
                    <AvatarGroup size='sm' max={2}>
                        {conversation.users.map((user) => (
                            <UserAvatar key={user.id} size="sm" user={user} />
                        ))}
                    </AvatarGroup>
                ) : (
                    <UserAvatar size="sm" user={otherUser} />
                )}
                <Stack spacing={0}>
                    <Text
                        fontSize='md'
                        fontWeight='bold'
                    >
                        {conversation.name || otherUser.name}
                    </Text>
                    <Text
                        color='gray.700'
                        fontSize='x-small'
                    >
                        {statusText}
                    </Text>
                </Stack>
            </Stack>
            <Icon
                cursor='pointer'
                boxSize={6}
                as={DotsThreeOutline}
                onClick={onOpen}
            />
            <ProfileDrawer data={conversation} isOpen={isOpen} onClose={onClose} />
        </Stack>
    );
}

export default Header;