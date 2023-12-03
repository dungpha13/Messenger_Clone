import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

const ProfileMenu = ({ anchorEl, handleClose, open }) => {

    return <>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 52,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
                Setting
            </MenuItem>
            <MenuItem onClick={handleClose}>
                Logout
            </MenuItem>
        </Menu>
    </>
}

export default ProfileMenu