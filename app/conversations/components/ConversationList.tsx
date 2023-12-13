'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Box, Icon, Stack, Text, Tooltip, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ConversationBox from "./ConversationBox";
import { UserPlus } from "phosphor-react";
import GroupChatModal from "@/app/components/modals/GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
    users: User[],
    conversations: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    users
}) => {

    const router = useRouter();
    const session = useSession();

    const [items, setItems] = useState(conversations);

    const { conversationId } = useConversation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const bgColor = useColorModeValue('gray.300', 'gray.300')

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey)

        const handleNewConversation = (newConversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: newConversation.id })) {
                    return current;
                }

                return [newConversation, ...current]
            })
        }

        const handleUpdatedConversation = (updatedConversation: FullConversationType) => {
            setItems((current) => current.map((currConversation) => {
                if (currConversation.id === updatedConversation.id) {
                    return {
                        ...currConversation,
                        messages: updatedConversation.messages
                    }
                }

                return currConversation;
            }))
        }

        const handleRemoveConversation = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((con) => con.id !== conversation.id)]
            })

            if (conversationId === conversation.id) {
                router.push('/conversations')
            }
        }

        pusherClient.bind('conversation:new', handleNewConversation)
        pusherClient.bind('conversation:update', handleUpdatedConversation)
        pusherClient.bind('conversation:remove', handleRemoveConversation);

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', handleNewConversation)
            pusherClient.unbind('conversation:update', handleUpdatedConversation)
        }

    }, [pusherKey, conversationId, router])

    return (
        <Box
            p={4}
            h='full'
            w='550px'
            display='flex'
            flexDirection='column'
            boxShadow='3px 0px 5px rgba(0, 0, 0, 0.1)'
        >
            <Stack spacing={4} h='full'>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    flexShrink={0}
                >
                    <Text as='b' fontSize='2xl'>Chats</Text>
                    <Tooltip label='Create group chat'>
                        <Icon
                            p={1}
                            bgColor={bgColor}
                            color='black'
                            rounded='full'
                            boxSize={8}
                            as={UserPlus}
                            cursor='pointer'
                            _hover={{
                                opacity: 0.75
                            }}
                            onClick={onOpen}
                        />
                    </Tooltip>
                    <GroupChatModal users={users} isOpen={isOpen} onClose={onClose} />
                </Stack>
                <Stack
                    spacing={2}
                    overflowY='auto'
                    h='full'
                    css={{
                        '&::-webkit-scrollbar': {
                            width: '5px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#E2E8F0',
                            borderRadius: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: '#4A5568',
                            borderRadius: '6px',
                        },
                    }}
                >
                    {items.map((el) => (
                        <ConversationBox key={el.id} conversation={el} selected={conversationId === el.id} />
                    ))}
                </Stack>
            </Stack>
        </Box >
    );
}

export default ConversationList;