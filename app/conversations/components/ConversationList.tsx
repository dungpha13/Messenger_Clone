'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Box, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConversationBox from "./ConversationBox";
import { UserPlus } from "phosphor-react";
import GroupChatModal from "@/app/components/modals/GroupChatModal";
import { User } from "@prisma/client";

interface ConversationListProps {
    users: User[],
    conversations: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversations,
    users
}) => {

    const router = useRouter();
    const [items, setItems] = useState(conversations);
    const { conversationId } = useConversation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => { }

    return (
        <Box
            h='full'
            w='400px'
            display='flex'
            flexDirection='column'
            p={4}
            borderRight='1px'
            borderRightColor='gray.200'
        >
            <Stack spacing={2}>
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Text as='b' fontSize='2xl'>Chats</Text>
                    <Icon
                        bgColor='gray.200'
                        rounded='full'
                        boxSize={6}
                        as={UserPlus}
                        cursor='pointer'
                        _hover={{
                            opacity: 0.75
                        }}
                        onClick={onOpen}
                    />
                    <GroupChatModal users={users} isOpen={isOpen} onClose={onClose} />
                </Stack>
                <Stack spacing={2}>
                    {items.map((el) => (
                        <ConversationBox key={el.id} conversation={el} selected={conversationId === el.id} />
                    ))}
                </Stack>
            </Stack>
        </Box >
    );
}

export default ConversationList;