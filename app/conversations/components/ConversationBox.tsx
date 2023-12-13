'use client';

import { FullConversationType } from "@/app/types";
import { useCallback, useMemo } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { useSession } from 'next-auth/react'
import useOtherUser from "@/app/hooks/useOtherUser";
import { useRouter } from "next/navigation";
import { AvatarGroup, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import UserAvatar from "@/app/components/UserAvatar";

interface ConversationBoxProps {
    conversation: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    conversation,
    selected
}) => {

    const session = useSession();
    const router = useRouter();

    const otherUser = useOtherUser(conversation);

    const bgColor = useColorModeValue('gray.200', 'gray.500')

    const handleClick = useCallback(() => {
        router.push(`/conversations/${conversation.id}`)
    }, [conversation.id, router])

    const lastMessage = useMemo(() => {
        const messages = conversation.messages || []

        return messages[messages.length - 1]

    }, [conversation.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const isOwn = useMemo(() => {
        return lastMessage?.sender?.email === session?.data?.user?.email
    }, [session?.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false
        }

        return seenArray.filter((user) => user.email === userEmail).length !== 0;

    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }
        if (lastMessage?.body) {
            return lastMessage?.body
        }

        return "Started a conversation"
    }, [lastMessage])

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
            bg={selected ? `${bgColor}` : ''}
            _hover={{
                bg: `${bgColor}`
            }}
            onClick={handleClick}
        >
            <Stack direction='row' alignItems='center' spacing={3}>
                {conversation.isGroup ? (
                    <AvatarGroup size='sm' max={1}>
                        {conversation.users.map((user) => (
                            <UserAvatar key={user.id} size="sm" user={user} />
                        ))}
                    </AvatarGroup>
                ) : (
                    <UserAvatar size="sm" user={otherUser} />
                )}
                <Stack direction='column' spacing={0.5}>
                    <Text fontSize='sm' as='b'>{conversation.name || otherUser.name}</Text>
                    <Stack direction='row' spacing={1}>
                        <Text fontSize='xs' fontWeight={hasSeen ? 'light' : 'bold'}>
                            {isOwn ? `You: ${lastMessageText}` : `${lastMessageText}`}.
                        </Text>
                        {lastMessage?.createdAt && (
                            <Stack alignItems='center'>
                                <Text fontSize='xs' fontWeight='light' color='gray.400'>
                                    {format(new Date(lastMessage?.createdAt), 'p')}
                                    {/* {formatDistanceToNow(new Date(lastMessage?.createdAt), { addSuffix: true })} */}
                                </Text>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default ConversationBox;