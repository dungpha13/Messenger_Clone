'use client'

import UserAvatar from "@/app/components/UserAvatar";
import { FullMessageType } from "@/app/types";
import { Box, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface MessageBoxProps {
    message: FullMessageType,
    isLast?: boolean,
    isOwn?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
    isLast,
    isOwn
}) => {

    const session = useSession();

    // const isOwn = session?.data?.user?.email === message?.sender?.email
    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name)
        .join(', ');



    return (
        <Stack
            direction='row'
            justifyContent={isOwn ? 'end' : 'start'}
        >
            <Stack direction='column'>
                <Stack
                    direction='row'
                    spacing={1}
                >
                    <Text
                        fontSize='x-small'
                    >
                        {message.sender.name}
                    </Text>
                    <Text
                        fontSize='x-small'
                        color='gray.400'
                    >
                        {format(new Date(message.createdAt), 'p')}
                    </Text>
                </Stack>
                <Stack
                >
                    {message.image ? (
                        <Image
                            alt="Image"
                            height='288px'
                            width='288px'
                            src={message.image}
                            objectFit='cover'
                            cursor='pointer'
                            _hover={{
                                transform: 'scale(1.1)'
                            }}
                        />
                    ) : (
                        <Text
                            bgColor={isOwn ? '#3490dc' : 'gray.100'}
                            color={isOwn ? 'white' : ''}
                            w='max-content'
                            p={1}
                            rounded='full'
                        >
                            {message.body}
                        </Text>
                    )}
                </Stack>
            </Stack>
            <UserAvatar size="sm" user={message.sender} />
        </Stack>
    );
}

export default MessageBox;