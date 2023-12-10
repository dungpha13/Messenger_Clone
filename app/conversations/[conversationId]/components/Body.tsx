'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { Stack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { useSession } from "next-auth/react";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";


interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const session = useSession();
    const [messages, setMessages] = useState(initialMessages);
    const { conversationId } = useConversation();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef?.current?.scrollIntoView();

        const handleMessage = (newMessage: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages((current) => {
                if (find(current, { id: newMessage.id })) {
                    return current;
                }
                return [newMessage, ...current]
            });
            bottomRef?.current?.scrollIntoView();
        }

        const handleUpdateMessage = (updatedMessage: FullMessageType) => {
            setMessages((cur) => cur.map((curM) => {
                if (curM.id === updatedMessage.id) {
                    return updatedMessage;
                }

                return curM;
            }))
        }

        pusherClient.bind('message:new', handleMessage)
        pusherClient.bind('message:update', handleUpdateMessage)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('message:new', handleMessage)
            pusherClient.unbind('message:update', handleUpdateMessage)
        }
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
            <div ref={bottomRef} />
        </Stack>
    );
}

export default Body;