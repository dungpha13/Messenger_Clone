'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConversationBox from "./ConversationBox";
import { UserPlus } from "phosphor-react";

interface ConversationListProps {
    conversations: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    conversations
}) => {

    const [items, setItems] = useState();

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

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
                        onClick={handleClick}
                    />
                </Stack>
                <Stack spacing={2}>
                    {conversations.map((el) => (
                        <ConversationBox key={el.id} conversation={el} selected={conversationId === el.id} />
                    ))}
                </Stack>
            </Stack>
        </Box >
    );
}

export default ConversationList;