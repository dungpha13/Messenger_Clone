'use client'

import {
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import { DotsThree, Trash, Archive } from "phosphor-react";
import DeleteModal from "./DeleteModal";
import ArchivedModal from "./ArchivedModal";
import { useState } from "react";

interface SettingConversationProps {
    conversationId?: string
}

const SettingConversation = ({
    conversationId
}: SettingConversationProps) => {

    const [isOpenArchive, setIsOpenArchive] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const bgColor = useColorModeValue('gray.300', 'gray.300')

    return (
        <Menu>
            <MenuButton>
                <Icon
                    as={DotsThree}
                    rounded='full'
                    boxSize={8}
                    bg='gray.50'
                    color='black'
                />
            </MenuButton>
            <MenuList>
                <Stack direction='column' spacing={2}>
                    <MenuItem>
                        <Stack
                            w='full'
                            direction='row'
                            alignItems='center'
                            justifyContent='start'
                            onClick={() => setIsOpenArchive(true)}
                        >
                            <Icon
                                p={1}
                                as={Archive}
                                boxSize={7}
                                bg={bgColor}
                                rounded='full'
                                cursor='pointer'
                                color='black'
                                _hover={{
                                    bg: 'gray.200'
                                }}
                            />
                            <Text
                                fontSize='sm'
                                as='b'
                            >
                                Archive
                            </Text>
                        </Stack>
                        <ArchivedModal conversationId={conversationId!} isOpen={isOpenArchive} onClose={() => setIsOpenArchive(false)} />
                    </MenuItem>
                    <MenuItem>
                        <Stack
                            w='full'
                            direction='row'
                            alignItems='center'
                            justifyContent='start'
                            onClick={() => setIsOpenDelete(true)}
                        >
                            <Icon
                                p={1}
                                as={Trash}
                                boxSize={7}
                                bg={bgColor}
                                rounded='full'
                                cursor='pointer'
                                color='black'
                                _hover={{
                                    bg: 'gray.200'
                                }}
                            />
                            <Text
                                fontSize='sm'
                                as='b'
                            >
                                Delete
                            </Text>
                        </Stack>
                        <DeleteModal conversationId={conversationId!} isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)} />
                    </MenuItem>
                </Stack>
            </MenuList>
        </Menu>
    );
}

export default SettingConversation;