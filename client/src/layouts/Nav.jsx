import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem, Divider } from '@mui/material';
import { Menu as MenuIcon, AccountCircle, Home, Star, EmojiEvents, Settings, ExitToApp, SportsGymnastics, CalendarMonth, Description, Person, EditNote, Campaign } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import footer from "../assets/footer-logo.webp";
import { useAuth } from 'features/auth/AuthContext';
import { ROUTES } from 'shared/routes/routes';

const Nav = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { role, logout } = useAuth();
    const isAdmin = role === "admin";
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const handleAccountMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccountMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate(ROUTES.login);
    };

    const handleAccountClick = () => {
        handleCloseAccountMenu();
        navigate(ROUTES.account);
    };

    const handleEvaluationClick = () => {
        handleCloseAccountMenu();
        navigate(ROUTES.adminCreateEvaluation);
    };

    const handleAnnouncementClick = () => {
        handleCloseAccountMenu();
        navigate(ROUTES.adminAnnouncements);
    };

    const handleSettingsClick = () => {
        handleCloseAccountMenu();
        navigate(ROUTES.adminHome);
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
                        backgroundColor: '#c5e1e9',
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
                    <ListItem button component={Link} to={ROUTES.dashboard} sx={{ '&:hover': { backgroundColor: '#A8BFC6' } }}>
                        <ListItemIcon sx={{ color: "#302539" }}><Home /></ListItemIcon>
                        <ListItemText primary="Início" />
                    </ListItem>
                    <ListItem button component={Link} to={ROUTES.schedule} sx={{ '&:hover': { backgroundColor: '#A8BFC6' } }}>
                        <ListItemIcon sx={{ color: "#302539" }}><SportsGymnastics /></ListItemIcon>
                        <ListItemText primary="Planejamento" />
                    </ListItem>
                    <ListItem button component={Link} to={ROUTES.evaluationHistoric} sx={{ '&:hover': { backgroundColor: '#A8BFC6' } }}>
                        <ListItemIcon sx={{ color: "#302539" }}><Star /></ListItemIcon>
                        <ListItemText primary="Avaliações" />
                    </ListItem>
                    <ListItem button component={Link} to={ROUTES.ranking} sx={{ '&:hover': { backgroundColor: '#A8BFC6' } }}>
                        <ListItemIcon sx={{ color: "#302539" }}><EmojiEvents /></ListItemIcon>
                        <ListItemText primary="Ranking" />
                    </ListItem>
                    <ListItem button component={Link} to={ROUTES.calendar} sx={{ '&:hover': { backgroundColor: '#A8BFC6' } }}>
                        <ListItemIcon sx={{ color: "#302539" }}><CalendarMonth /></ListItemIcon>
                        <ListItemText primary="Calendário" />
                    </ListItem>
                    <ListItem button component={Link} to={ROUTES.training} sx={{ '&:hover': { backgroundColor: '#A8BFC6' } }}>
                        <ListItemIcon sx={{ color: "#302539" }}><Description /></ListItemIcon>
                        <ListItemText primary="Treinos" />
                    </ListItem>
                </List>
                <Divider sx={{ background: "#c5e1e9" }} />
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
                <MenuItem onClick={handleAccountClick}>
                    <ListItemIcon><Person /></ListItemIcon>
                    Conta
                </MenuItem>

                {isAdmin && (
                    <>
                        <MenuItem onClick={handleEvaluationClick}>
                            <ListItemIcon><EditNote /></ListItemIcon>
                            Avaliação
                        </MenuItem>
                        <MenuItem onClick={handleAnnouncementClick}>
                            <ListItemIcon><Campaign /></ListItemIcon>
                            Avisos
                        </MenuItem>
                        <MenuItem onClick={handleSettingsClick}>
                            <ListItemIcon><Settings /></ListItemIcon>
                            Configurações
                        </MenuItem>
                    </>
                )}

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon sx={{ color: "#302539" }}><ExitToApp /></ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Nav;
