import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChatCircleDots, Users, SignOut, ArchiveBox } from "phosphor-react";

import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: ChatCircleDots,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: Users,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            href: '#',
            icon: SignOut,
            onClick: () => signOut()
        }
    ], [pathname, conversationId])

    return routes
}

export default useRoutes