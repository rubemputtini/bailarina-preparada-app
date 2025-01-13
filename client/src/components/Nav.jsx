import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem, Divider } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Home, Star, EmojiEvents, Settings, ExitToApp, SportsGymnastics, CalendarMonth, Description, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import footer from "../assets/footer-logo.webp";

const Navbar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleAccountMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorEl(null);
    };

    return (
        <div className="flex justify-between items-center p-4">
            <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, color: "white" }}
            >
                <MenuIcon />
            </IconButton>

            <IconButton
                size="large"
                aria-label="account"
                onClick={handleAccountMenu}
                sx={{ mr: 1, color: "white" }}>
                <AccountCircle />
            </IconButton>

            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        backgroundColor: '#f3e8ff',
                        paddingTop: '20px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRight: '2px solid #eee',
                    },
                }}
            >
                <div className="px-6 text-center">
                    <img
                        src={footer}
                        alt="Bailarina Preparada Logo"
                        className="h-12 mx-auto mb-6"
                    />
                </div>
                <List>
                    <ListItem button component={Link} to="/home" sx={{ '&:hover': { backgroundColor: '#D6A8E5' } }}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/planejamento" sx={{ '&:hover': { backgroundColor: '#D6A8E5' } }}>
                        <ListItemIcon><SportsGymnastics /></ListItemIcon>
                        <ListItemText primary="Planejamento" />
                    </ListItem>
                    <ListItem button component={Link} to="/avaliacao" sx={{ '&:hover': { backgroundColor: '#D6A8E5' } }}>
                        <ListItemIcon><Star /></ListItemIcon>
                        <ListItemText primary="Avaliações" />
                    </ListItem>
                    <ListItem button component={Link} to="/ranking" sx={{ '&:hover': { backgroundColor: '#D6A8E5' } }}>
                        <ListItemIcon><EmojiEvents /></ListItemIcon>
                        <ListItemText primary="Ranking" />
                    </ListItem>
                    <ListItem button component={Link} to="/calendario" sx={{ '&:hover': { backgroundColor: '#D6A8E5' } }}>
                        <ListItemIcon><CalendarMonth /></ListItemIcon>
                        <ListItemText primary="Calendário" />
                    </ListItem>
                    <ListItem button component={Link} to="/treinos" sx={{ '&:hover': { backgroundColor: '#D6A8E5' } }}>
                        <ListItemIcon><Description /></ListItemIcon>
                        <ListItemText primary="Treinos" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseAccountMenu}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '10px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <MenuItem onClick={handleCloseAccountMenu}>
                    <ListItemIcon><Person /></ListItemIcon>
                    Conta
                </MenuItem>
                <MenuItem onClick={handleCloseAccountMenu}>
                    <ListItemIcon><Settings /></ListItemIcon>
                    Configurações
                </MenuItem>
                <MenuItem onClick={handleCloseAccountMenu}>
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Navbar;
