'use client';

import useRoutes from "@/app/hooks/useRoutes";
import { Box, Stack } from "@chakra-ui/react";
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

    console.log({ currentUser })

    return (
        <Box
            position='fixed'
            insetY={0}
            left={0}
            zIndex={40}
            w={20}
            px={6}
            bgColor='white'
            pb={4}
            display='flex'
            flexDir='column'
            alignItems='center'
            borderRight='1px'
            borderRightColor='gray.200'
        >
            <Stack h='full' direction='column' justifyContent='space-between'>
                <Stack direction='column' spacing={1} alignItems='center' pt={3}>
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
                <Stack>
                    <UserAvatar user={currentUser} />
                </Stack>
            </Stack>
        </Box>
    );
}

export default DesktopSidebar;