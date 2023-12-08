'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import UserAvatar from "../UserAvatar";

interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {

    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Box
            h='full'
            w={20}
            p={4}
            display='flex'
            flexDir='column'
            alignItems='center'
            borderRight='1px'
            borderRightColor='gray.200'
        >
            <Stack h='full' direction='column' justifyContent='space-between'>
                <Stack direction='column' spacing={1} alignItems='center'>
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
                <Button
                    borderRadius={24}
                    p={0}
                    w='48px'
                    h='48px'
                    cursor='pointer'
                    onClick={() => setIsOpen(true)}
                    _hover={{
                        opacity: 0.75,
                    }}
                >
                    <UserAvatar size="md" user={currentUser} />
                </Button>
            </Stack>
        </Box >
    );
}

export default DesktopSidebar;