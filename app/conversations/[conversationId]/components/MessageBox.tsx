'use client'

import UserAvatar from "@/app/components/UserAvatar";
import { FullMessageType } from "@/app/types";
import { Image, Stack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

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

    // const isOwn = session?.data?.user?.email === message?.sender?.email
    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    return (
        <Stack
            justifyContent={isOwn ? 'end' : 'start'}
            direction={isOwn ? 'row-reverse' : 'row'}
        >
            <UserAvatar size="sm" user={message.sender} />
            <Stack direction='column' spacing={1}>
                <Stack
                    spacing={1}
                    direction='row'
                    justifyContent={isOwn ? 'end' : 'start'}
                >
                    <Text
                        fontSize='x-small'
                    >
                        {message.sender.name}
                    </Text>
                    <Text
                        color='gray.400'
                        fontSize='x-small'
                    >
                        {format(new Date(message.createdAt), 'p')}
                    </Text>
                </Stack>
                <Stack
                    direction='row'
                    justifyContent={isOwn ? 'end' : 'start'}
                >
                    {message.image ? (
                        <Image
                            alt="Image"
                            width='288px'
                            height='288px'
                            cursor='pointer'
                            objectFit='cover'
                            src={message.image}
                        // _hover={{
                        //     transform: 'scale(1.1)'
                        // }}
                        />
                    ) : (
                        <Text
                            p={1}
                            px={2}
                            w='max-content'
                            borderRadius={16}
                            alignItems='center'
                            justifyContent='center'
                            color={isOwn ? 'white' : 'black'}
                            bgColor={isOwn ? '#3490dc' : 'gray.200'}
                        >
                            {message.body}
                        </Text>
                    )}
                </Stack>
                {/* {isLast && isOwn && seenList.length > 0 && (
                    <Stack>
                        <Text>
                            {`Seen by ${seenList}`}
                        </Text>
                    </Stack>
                )} */}
            </Stack>
        </Stack>
    );
}

export default MessageBox;