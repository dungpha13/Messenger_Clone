import { Box } from "@chakra-ui/react"
import DesktopSidebar from "./DesktopSidebar"
import getCurrentUser from "@/app/actions/getCurrentUser"

async function Sidebar({ children
}: {
    children: React.ReactNode
}) {

    const currentUser = await getCurrentUser()

    return (
        <Box
            display='flex'
            minH='full'
            minW='full'
        >
            <DesktopSidebar currentUser={currentUser!} />
            {children}
        </Box>
    )
}

export default Sidebar