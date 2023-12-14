'use client'

import UserAvatar from "@/app/components/UserAvatar";
import { FullMessageType } from "@/app/types";
import { Image, Stack, Text, Tooltip, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    message: FullMessageType,
    isLast?: boolean,
    isOwn?: boolean,
    isSameSender?: boolean,
    isFirstMessage?: boolean,
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
    isLast,
    isOwn,
    isSameSender,
    isFirstMessage
}) => {

    // const isOwn = session?.data?.user?.email === message?.sender?.email
    const { isOpen, onOpen, onClose } = useDisclosure();
    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    return (
        <Stack
            justifyContent={isOwn ? 'end' : 'start'}
            direction={isOwn ? 'row-reverse' : 'row'}
            alignItems='flex-end'
        >
            {isSameSender ? (
                <UserAvatar size="sm" user={message.sender} />
            ) : (
                <Stack w='32px' h='32px' />
            )}
            <Stack direction='column' spacing={1}>
                {isFirstMessage && (
                    <Stack
                        px={2}
                        direction='row'
                        justifyContent={isOwn ? 'end' : 'start'}
                    >
                        <Text
                            fontSize='x-small'
                            w='max-content'
                        >
                            {message.sender.name?.split(" ").pop()}
                        </Text>
                    </Stack>
                )}
                <Tooltip label={format(new Date(message.createdAt), 'p')} placement={isOwn ? 'left' : 'right'}>
                    <Stack
                        direction='row'
                        w='max-content'
                        justifyContent={isOwn ? 'end' : 'start'}
                    >
                        {message.image ? (
                            <>
                                <Image
                                    alt="Image"
                                    width='288px'
                                    height='288px'
                                    cursor='pointer'
                                    objectFit='cover'
                                    src={message.image}
                                    onClick={onOpen}
                                    bg={useColorModeValue('gray.100', 'gray.700')}
                                    rounded='lg'
                                // _hover={{
                                //     transform: 'scale(1.1)'
                                // }}
                                />
                                <ImageModal isOpen={isOpen} onClose={onClose} src={message.image} />
                            </>
                        ) : (
                            <Text
                                p={1}
                                px={2}
                                w='max-content'
                                borderRadius={16}
                                alignItems='center'
                                justifyContent='center'
                                color={isOwn ? 'white' : 'black'}
                                bgColor={isOwn ? '#0a7cff' : 'gray.200'}
                            >
                                {message.body}
                            </Text>
                        )}
                    </Stack>
                </Tooltip>
                {isLast && isOwn && seenList.length > 0 && (
                    <Stack>
                        <Text>
                            {`Seen by ${seenList}`}
                        </Text>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
}

export default MessageBox;