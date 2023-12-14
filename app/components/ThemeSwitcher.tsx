"use client";

import { Box, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Moon, Sun } from "phosphor-react";
import React, { useEffect, useState } from "react";

function ThemeSwitcher() {

    const { colorMode, toggleColorMode } = useColorMode()
    const [mounted, setMounted] = useState(false);

    const bgColor = useColorModeValue('gray.200', 'gray.700')
    const bgHoverColor = useColorModeValue('gray.300', 'gray.600')

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Box
            boxSize={10}
            bg={bgColor}
            display='flex'
            rounded='lg'
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
            _hover={{
                bg: `${bgHoverColor}`
            }}
            onClick={toggleColorMode}
        >
            {colorMode === 'dark' ? (
                <Sun size={24} />
            ) : (
                <Moon size={24} />
            )}
        </Box>
    );
}

export default ThemeSwitcher;