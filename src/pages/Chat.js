import { Stack } from '@mui/material'
import React from 'react'
import DashboardLayout from '../components/dashboard'
import Chats from '../components/chats'

const Chat = () => {
    return <Stack direction="row">
        <DashboardLayout />
        <Chats />
    </Stack>
}

export default Chat