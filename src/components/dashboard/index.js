import React, { useState } from 'react'
import { Avatar, Box, Divider, Icon, IconButton, Stack, Switch, styled, useTheme } from '@mui/material'
import { Gear } from 'phosphor-react'
import { Icons_Dashboard } from '../../data'
import { useThemeContext } from '../../contexts/ThemeContext';
import ProfileMenu from '../miscellaneous/ProfileMenu';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(4px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(24px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const DashboardLayout = () => {

    const [selected, setSelected] = useState(0)
    const { currentTheme, toggleTheme } = useThemeContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box p={2} sx={{ boxSizing: 'border-box', backgroundColor: currentTheme.palette.primary.main, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "100vh", width: 82 }}>
                <Stack direction="column" sx={{ height: "100%" }} alignItems={"center"} justifyContent="space-between" >
                    <Stack alignItems="center" spacing={4}>
                        <IconButton
                            sx={{ paddingBottom: "0px" }}
                            onClick={handleClick}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{
                                height: 48,
                                width: 48,
                            }}
                            >
                                D
                            </Avatar>
                        </IconButton>
                        <ProfileMenu anchorEl={anchorEl} handleClose={handleClose} open={open} />
                        <Stack spacing={3} sx={{ width: "max-content" }} direction="column" alignItems="center">
                            {Icons_Dashboard.map((el) => (
                                <Box key={el.index} sx={{
                                    backgroundColor: selected === el.index && theme.palette.primary.main,
                                    borderRadius: 1.5,
                                }}>
                                    <IconButton sx={{ width: "max-content", color: selected === el.index ? "#fff" : "#000" }} onClick={() => setSelected(el.index)}>{el.icon}</IconButton>
                                </Box>
                            ))}
                            <Divider style={{ width: '100%' }} />
                            <Box sx={{
                                backgroundColor: selected === 3 && theme.palette.primary.main,
                                borderRadius: 1.5,
                            }}>
                                <IconButton sx={{ width: "max-content", color: selected === 3 ? "#fff" : "#000" }} onClick={() => setSelected(3)}>
                                    <Gear />
                                </IconButton>
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack alignItems="center">
                        <MaterialUISwitch defaultChecked theme={currentTheme} onChange={() => toggleTheme()} />
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default DashboardLayout