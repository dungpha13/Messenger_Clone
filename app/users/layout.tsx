import { Box } from "@chakra-ui/react";
import Sidebar from "../components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";


export default async function UsersLayout({ children
}: {
    children: React.ReactNode
}) {

    const users = await getUsers()

    return (
        <Box
            h='full'
            w='full'
            display='flex'
            justifyContent="space-between"
        >
            <Sidebar />
            <UserList users={users} />
            {children}
        </Box>
    );
}