import { Box } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../actions/getConversations";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}) {

    const conversations = await getConversations();

    return (
        <Box
            h='full'
            w='full'
            display='flex'
            justifyContent="space-between"
        >
            <Sidebar />
            <ConversationList conversations={conversations} />
            {children}
        </Box>
    );
}