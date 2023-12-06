'use client';

import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { User } from "@prisma/client";

interface UserAvatarProps {
    user: User
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    user
}) => {
    return (
        <Avatar size='md' src={user?.image || '/images/placeholder.jpg'}>
            <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
    );
}

export default UserAvatar;