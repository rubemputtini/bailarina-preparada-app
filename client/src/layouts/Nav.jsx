import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Menu, MenuItem, Divider } from '@mui/material';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon, CalendarDaysIcon, ClipboardDocumentListIcon, TrophyIcon, StarIcon, DocumentTextIcon, UserIcon, ClipboardDocumentCheckIcon, MegaphoneIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import footer from "../assets/footer-logo.webp";
import { useAuth } from 'features/auth/AuthContext';
import { ROUTES } from 'shared/routes/routes';
import { useUserData } from 'hooks/useUserData';
import useIsAdmin from 'hooks/useIsAdmin';

const Nav = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { logout } = useAuth();
    const isAdmin = useIsAdmin();
    const user = useUserData();
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

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
                <Bars3Icon className="h-6 w-6 text-white" />
            </IconButton>

            <IconButton
                size="large"
                aria-label="account"
                onClick={handleAccountMenu}
                sx={{ mr: 1, color: "white" }}>
                <UserCircleIcon className="h-6 w-6 text-white" />
            </IconButton>

            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 250,
                        backgroundColor: 'rgba(26, 26, 43, 0.9)',
                        backdropFilter: 'blur(6px)',
                        paddingTop: '20px',
                        borderRight: 'none',
                        color: 'white',
                    },
                }}
            >
                <div className="px-6 text-center mb-4">
                    <img
                        src={footer}
                        alt="Bailarina Preparada Logo"
                        className="h-10 mx-auto mb-4"
                    />
                </div>

                <List className="px-2">
                    {[
                        { text: 'Início', icon: HomeIcon, route: ROUTES.dashboard },
                        { text: 'Planejamento', icon: ClipboardDocumentListIcon, route: ROUTES.schedule },
                        { text: 'Avaliações', icon: StarIcon, route: ROUTES.evaluationHistoric },
                        { text: 'Ranking', icon: TrophyIcon, route: ROUTES.ranking },
                        { text: 'Calendário', icon: CalendarDaysIcon, route: ROUTES.calendar },
                        { text: 'Treinos', icon: DocumentTextIcon, route: ROUTES.training },
                    ].map(({ text, icon: Icon, route }) => (
                        <ListItem
                            key={text}
                            button
                            component={Link}
                            to={route}
                            onClick={handleDrawerToggle}
                            className={`group rounded-lg px-4 py-2 mb-1 transition-all ${isActive(route) ? 'bg-white/10 border-l-4 border-purple-500' : 'hover:bg-white/5'
                                }`}
                        >
                            <ListItemIcon className="min-w-[36px]">
                                <Icon
                                    className={`h-6 w-6 ${isActive(route) ? 'text-indigo-300' : 'text-white group-hover:text-indigo-300'
                                        }`}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                primaryTypographyProps={{ className: 'text-white text-sm font-medium' }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ background: "#2a1c3f" }} />

                {user && (
                    <div
                        className="mt-auto px-4 py-3 flex items-center gap-2 border-t border-white/10 cursor-pointer hover:bg-white/5 transition"
                        onClick={() => {
                            handleDrawerToggle();
                            navigate(ROUTES.account);
                        }}
                    >
                        <UserCircleIcon className="h-6 w-6 text-white" />
                        <span className="text-white text-sm font-semibold truncate">
                            {user.name}
                        </span>
                    </div>
                )}
            </Drawer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseAccountMenu}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '12px',
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
                        mt: 1,
                        minWidth: 220,
                        padding: '4px 0',
                        backgroundColor: '#fff',
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleAccountClick} sx={{ px: 2, py: 1.2 }}>
                    <UserIcon className="h-5 w-5 text-gray-700 mr-2" />
                    <span className="text-sm text-gray-800 font-medium">Conta</span>
                </MenuItem>

                {isAdmin && (
                    <>
                        <MenuItem onClick={handleEvaluationClick} sx={{ px: 2, py: 1.2 }}>
                            <ClipboardDocumentCheckIcon className="h-5 w-5 text-gray-700 mr-2" />
                            <span className="text-sm text-gray-800 font-medium">Avaliação</span>
                        </MenuItem>
                        <MenuItem onClick={handleAnnouncementClick} sx={{ px: 2, py: 1.2 }}>
                            <MegaphoneIcon className="h-5 w-5 text-gray-700 mr-2" />
                            <span className="text-sm text-gray-800 font-medium">Avisos</span>
                        </MenuItem>
                        <MenuItem onClick={handleSettingsClick} sx={{ px: 2, py: 1.2 }}>
                            <Cog6ToothIcon className="h-5 w-5 text-gray-700 mr-2" />
                            <span className="text-sm text-gray-800 font-medium">Configurações</span>
                        </MenuItem>
                    </>
                )}

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={handleLogout} sx={{ px: 2, py: 1.2 }}>
                    <ArrowRightOnRectangleIcon className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-800 font-medium">Sair</span>
                </MenuItem>
            </Menu>


        </div>
    );
};

export default Nav;
