'use client';

import UserAvatar from "@/app/components/UserAvatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Divider, Drawer, DrawerContent, DrawerOverlay, Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Trash } from "phosphor-react";
import { useMemo, useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
    onClose: () => void,
    isOpen: boolean,
    data: Conversation & {
        users: User[]
    }
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    onClose,
    isOpen,
    data
}) => {

    const otherUser = useOtherUser(data);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name;
    }, [data.name, otherUser.name])

    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        return 'Active'
    }, [data])

    return (
        <Drawer onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <Stack
                    p={4}
                    spacing={2}
                    direction='column'
                >
                    <Stack
                        spacing={3}
                        direction='column'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <UserAvatar size="md" user={otherUser} />
                        <Stack
                            spacing={1}
                            direction='column'
                        >
                            <Text
                                fontSize='md'
                                fontWeight='bold'
                            >
                                {title}
                            </Text>
                            <Text
                                color='gray.700'
                                fontSize='x-small'
                                textAlign='center'
                            >
                                {statusText}
                            </Text>
                        </Stack>
                        <Stack
                            direction='row'
                        >
                            <Stack
                                direction='column'
                                alignItems='center'
                            >
                                <Icon
                                    p={1}
                                    as={Trash}
                                    boxSize={7}
                                    bg='gray.300'
                                    rounded='full'
                                    cursor='pointer'
                                    color='black.500'
                                    _hover={{
                                        bg: 'gray.200'
                                    }}
                                    onClick={() => setIsOpenConfirm(true)}
                                />
                                <Text
                                    fontSize='x-small'
                                >
                                    Delete
                                </Text>
                                <ConfirmModal isOpen={isOpenConfirm} onClose={() => setIsOpenConfirm(false)} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider w='full' />
                    <Stack>
                        <Stack
                            p={2}
                            spacing={1}
                            direction='column'
                        >
                            <Text
                                fontSize='md'
                                fontWeight='bold'
                            >
                                Email
                            </Text>
                            <Text
                                color='gray.700'
                                fontSize='sm'
                            >
                                {otherUser.email}
                            </Text>
                        </Stack>
                    </Stack>
                    <Divider w='full' />
                    <Stack>
                        <Stack
                            p={2}
                            spacing={1}
                            direction='column'
                        >
                            <Text
                                fontSize='md'
                                fontWeight='bold'
                            >
                                Joined
                            </Text>
                            <Text
                                color='gray.700'
                                fontSize='sm'
                            >
                                {joinedDate}
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </DrawerContent>
        </Drawer>
    );
}

export default ProfileDrawer;