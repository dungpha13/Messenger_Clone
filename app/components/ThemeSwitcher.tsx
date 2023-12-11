"use client";

import { Switch, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function ThemeSwitcher() {

    const { toggleColorMode } = useColorMode()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Switch size='md' onChange={toggleColorMode} />
    );
}

export default ThemeSwitcher;