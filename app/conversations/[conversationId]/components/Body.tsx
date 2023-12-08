'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import { useSession } from "next-auth/react";
import axios from "axios";


interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const session = useSession();
    const [messages, setMessages] = useState(initialMessages);
    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    return (
        <Stack
            h='full'
            p={3}
            direction='column-reverse'
            spacing={4}
            overflowX='auto'
        >
            {messages?.map((m, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={m.id}
                    message={m}
                    isOwn={session?.data?.user?.email === m?.sender?.email}
                />
            ))}
        </Stack>
    );
}

export default Body;