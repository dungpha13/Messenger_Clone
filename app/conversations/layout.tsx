import { Box } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./_components/ConversationList";
import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {

    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <Box
            h='full'
            w='full'
            display='flex'
            justifyContent="space-between"
        >
            <Sidebar />
            <ConversationList users={users} conversations={conversations} />
            {children}
        </Box>
    );
}