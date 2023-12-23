import { Box, Stack } from "@chakra-ui/react";

import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
    conversationId: string
}

const ConversationId = async (
    {
        params
    }: {
        params: IParams
    }
) => {

    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    if (!conversation) {
        return (
            <Box
                h='full'
                w='full'
            >
                <EmptyState />
            </Box>
        )
    }

    return (
        <Stack
            h='full'
            w='full'
            direction='column'
            justifyContent='space-between'
            spacing={0}
        >
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <Form />
        </Stack>
    );
}

export default ConversationId;