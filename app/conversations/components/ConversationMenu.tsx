'use client';

import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

interface ConversationMenuProps {
    isOpen: boolean,
}


const ConversationMenu: React.FC<ConversationMenuProps> = ({
    isOpen
}) => {
    return (
        <Menu>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default ConversationMenu;