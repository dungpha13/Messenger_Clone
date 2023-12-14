'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import UserAvatar from "../UserAvatar";
import SettingsModal from "./SettingsModal";
import ThemeSwitcher from "../ThemeSwitcher";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {

    const routes = useRoutes();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            h='full'
            w={20}
            p={4}
            display='flex'
            flexDir='column'
            alignItems='center'
            boxShadow='3px 0px 5px rgba(0, 0, 0, 0.1)'
        >
            <Stack h='full' direction='column' justifyContent='space-between'>
                <Stack direction='column' spacing={3} alignItems='center'>
                    {routes.map((el) => (
                        <DesktopItem
                            key={el.label}
                            href={el.href}
                            label={el.label}
                            icon={el.icon}
                            active={el.active}
                            onClick={el.onClick}
                        />
                    ))}
                </Stack>
                <Stack direction='column' alignItems='center' spacing={3}>
                    <ThemeSwitcher />
                    <Stack>
                        <Button
                            borderRadius={24}
                            p={0}
                            w='48px'
                            h='48px'
                            cursor='pointer'
                            onClick={onOpen}
                            _hover={{
                                opacity: 0.75,
                            }}
                        >
                            <UserAvatar size="md" user={currentUser} />
                        </Button>
                        <SettingsModal isOpen={isOpen} onClose={onClose} user={currentUser} />
                    </Stack>
                </Stack>
            </Stack>
        </Box >
    );
}

export default DesktopSidebar;