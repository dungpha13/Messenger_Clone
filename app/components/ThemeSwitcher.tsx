"use client";

import { Box, Switch, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Moon, Sun } from "phosphor-react";
import React, { useEffect, useState } from "react";

function ThemeSwitcher() {

    const { colorMode, toggleColorMode } = useColorMode()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Box
            boxSize={10}
            bg={useColorModeValue('gray.200', 'gray.700')}
            display='flex'
            rounded='lg'
            justifyContent='center'
            alignItems='center'
            cursor='pointer'
            _hover={{
                bg: `${useColorModeValue('gray.300', 'gray.600')}`
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