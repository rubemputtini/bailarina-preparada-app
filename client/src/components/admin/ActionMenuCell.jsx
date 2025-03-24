import { useState } from "react";
import {
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    ListItemIcon
} from "@mui/material";
import {
    Edit,
    Delete,
    Visibility,
    CalendarMonth,
    MoreVert
} from "@mui/icons-material";

const ActionMenuCell = ({ row, onView, onEdit, onSchedule, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className="flex items-center justify-start">
            <div className="hidden md:flex gap-2">
                <Tooltip title="Ver detalhes">
                    <IconButton sx={{ color: "#388E3C" }} onClick={() => onView(row.id)}>
                        <Visibility />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Editar usuário">
                    <IconButton sx={{ color: "#1976D2" }} onClick={() => onEdit(row.id)}>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Planejamento semanal">
                    <IconButton sx={{ color: "#6A1B9A" }} onClick={() => onSchedule(row.id)}>
                        <CalendarMonth />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir usuário">
                    <IconButton sx={{ color: "#D32F2F" }} onClick={() => onDelete(row.id)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="block md:hidden">
                <IconButton onClick={handleMenuClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
                            backgroundColor: "#ffffff",
                            minWidth: 180,
                            mt: 1,
                            fontFamily: "var(--primary-font)",
                            "& .MuiMenuItem-root": {
                                fontSize: "14px",
                                "&:hover": {
                                    backgroundColor: "#f1f5f9",
                                },
                            },
                        },
                    }}
                >
                    <MenuItem onClick={() => { onView(row.id); handleClose(); }}>
                        <ListItemIcon sx={{ color: "#388E3C" }}><Visibility fontSize="small" /></ListItemIcon>
                        Ver detalhes
                    </MenuItem>
                    <MenuItem onClick={() => { onEdit(row.id); handleClose(); }}>
                        <ListItemIcon sx={{ color: "#1976D2" }}><Edit fontSize="small" /></ListItemIcon>
                        Editar usuário
                    </MenuItem>
                    <MenuItem onClick={() => { onSchedule(row.id); handleClose(); }}>
                        <ListItemIcon sx={{ color: "#6A1B9A" }}><CalendarMonth fontSize="small" /></ListItemIcon>
                        Planejamento
                    </MenuItem>
                    <MenuItem onClick={() => { onDelete(row.id); handleClose(); }}>
                        <ListItemIcon sx={{ color: "#D32F2F" }}><Delete fontSize="small" /></ListItemIcon>
                        Excluir usuário
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default ActionMenuCell;
