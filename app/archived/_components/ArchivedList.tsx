'use client';

import { Box, Icon, Stack, Text, Tooltip, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { UserPlus } from "phosphor-react";
import { find } from "lodash";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { FullConversationType } from "@/app/types";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import ArchivedBox from "./ArchivedBox";
import SettingArchived from "./SettingArchived";

interface ArchivedListProps {
    archiveds: FullConversationType[];
}

const ArchivedList: React.FC<ArchivedListProps> = ({
    archiveds,
}) => {

    const router = useRouter();
    const session = useSession();

    const [items, setItems] = useState(archiveds);

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
            w='500px'
            display='flex'
            flexDirection='column'
            boxShadow='3px 0px 5px rgba(0, 0, 0, 0.1)'
        >
            <Stack spacing={2} h='full'>
                <Stack
                    h='full'
                    spacing={2}
                    direction='column'
                    alignItems='center'
                >
                    <Stack
                        px={6}
                        w='full'
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Text as='b' fontSize='2xl'>Archiveds</Text>
                    </Stack>
                    <Stack maxH='650px' h='full' w='full'>
                        <Stack
                            hidden={false}
                            spacing={2}
                            overflowY='auto'
                            overflowX='hidden'
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
                                <Stack role="group" key={el.id} direction='row' position='relative' w='full'>
                                    <ArchivedBox key={el.id} conversation={el} selected={conversationId === el.id} />
                                    <Stack
                                        position="absolute"
                                        top="25%"
                                        right="3"
                                        zIndex="-1"
                                        display='none'
                                        justifyContent='center'
                                        alignItems='center'
                                        _groupHover={{
                                            display: 'flex',
                                            zIndex: '1'
                                        }}>
                                        <SettingArchived conversationId={el.id} />
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box >
    );
}

export default ArchivedList;