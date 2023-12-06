import { Box } from "@chakra-ui/react"
import DesktopSidebar from "./DesktopSidebar"
import getCurrentUser from "@/app/actions/getCurrentUser"

async function Sidebar() {

    const currentUser = await getCurrentUser()

    return (
        <Box
            h='full'
            display='flex'
        >
            <DesktopSidebar currentUser={currentUser!} />
        </Box>
    )
}

export default Sidebar