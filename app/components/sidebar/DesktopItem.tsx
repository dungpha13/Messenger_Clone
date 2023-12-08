'use client';

import { Stack, Text, Link, IconButton } from "@chakra-ui/react";

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
            bg={active ? 'gray.200' : ''}
            _hover={{
                textColor: 'black',
                bg: 'gray.200'
            }}
        >
            <Stack direction='row' alignItems='center'>
                <IconButton
                    colorScheme='gray.100'
                    aria-label='Icon Sidebar'
                    icon={<Icon color='black' size={24} />}
                />
                <Text srOnly>{label}</Text>
            </Stack>
        </Link>
    );
}

export default DesktopItem;