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
                return [...current, newMessage]
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
            p={4}
            direction='column'
            spacing={2}
            overflowX='auto'
            css={{
                '&::-webkit-scrollbar': {
                    width: '6px',
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
            {messages?.map((m, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    isSameSender={m?.senderId !== messages[i + 1]?.senderId}
                    isFirstMessage={m?.senderId !== messages[i - 1]?.senderId}
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