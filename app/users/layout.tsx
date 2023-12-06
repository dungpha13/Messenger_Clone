import { Box } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";


export default async function UsersLayout({ children
}: {
    children: React.ReactNode
}) {
    return (
        <Box
            minH='full'
            display='flex'
        >
            <Sidebar>
                {children}
            </Sidebar>
        </Box>
    );
}