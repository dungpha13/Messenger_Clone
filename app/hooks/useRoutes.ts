import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChatCircleDots, Users, SignOut } from "phosphor-react";

import { signOut } from "next-auth/react";

import useConversation from "./useConversation";

const useRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversation',
            icon: ChatCircleDots,
            active: pathname === '/conversation' || !!conversationId
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
        },
    ], [pathname, conversationId])

    return routes
}

export default useRoutes