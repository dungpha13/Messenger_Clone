'use client';

import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";

interface UserAvatarProps {
    user: User,
    size: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    user,
    size
}) => {

    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1

    return (
        <Avatar
            size={size}
            src={user?.image || '/images/placeholder.jpg'}
        >
            {isActive && (<AvatarBadge boxSize='1.25em' bg='green.500' />)}
        </Avatar>
    );
}

export default UserAvatar;