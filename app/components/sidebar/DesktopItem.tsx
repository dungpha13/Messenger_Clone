'use client';

import { Stack, Text, Link, IconButton, useColorModeValue, Tooltip } from "@chakra-ui/react";

interface DesktopItemProps {
    label: string,
    icon: any,
    href: string,
    onClick?: () => void,
    active?: boolean

}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active
}) => {

    const bgColor = useColorModeValue('gray.200', 'gray.500')
    const iconColor = useColorModeValue('black', 'whitesmoke')

    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            borderRadius={10}
            bg={active ? `${bgColor}` : ''}
            _hover={{
                bg: `${bgColor}`
            }}
        >
            <Stack direction='row' alignItems='center'>
                <Tooltip label={label}>
                    <IconButton
                        colorScheme='gray.100'
                        aria-label='Icon Sidebar'
                        icon={<Icon color={iconColor} size={24} />}
                    />
                </Tooltip>
                <Text srOnly>{label}</Text>
            </Stack>
        </Link>
    );
}

export default DesktopItem;