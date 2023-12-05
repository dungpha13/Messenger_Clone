import React from 'react'
import { Box, Button, Link, Stack, Typography, useTheme } from '@mui/material'
import { ChatCircle, ChatsCircle } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const theme = useTheme()
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

    return <Stack direction={"column"} height={"100vh"}>
        <Stack p={2} sx={{
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            height: 60,
            width: "100%",

        }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <ChatsCircle size={32} />
            <Stack spacing={2} direction={"row"}>
                <Link href="/login" color="inherit" underline="none">
                    <Typography>Login</Typography>
                </Link>
                <Link href="/chats" color="inherit" underline="none">
                    <Typography>Chat</Typography>
                </Link>
            </Stack>
        </Stack>
        <Stack height={"100%"} direction={"row"}>
            <Stack p={12} width={"50%"} direction={"column"} alignItems={"start"} justifyContent={"center"} boxSizing={"border-box"}>
                <Typography variant="h3" gutterBottom>
                    Chat a snap!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Simple chat app make everyone closer
                </Typography>
                <Button variant="contained" color="success" endIcon={<ChatCircle />} onClick={handleClick}>
                    Get started
                </Button>
            </Stack>
            <Box width={"50%"}
                sx={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym90fGVufDB8fDB8fHww')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}
            />
        </Stack>
    </Stack>
}

export default HomePage