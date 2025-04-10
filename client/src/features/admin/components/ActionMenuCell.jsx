import { useState } from "react";
import {
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";
import {
    PencilSquareIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    TrashIcon,
    EllipsisVerticalIcon
} from "@heroicons/react/24/outline";

const ActionMenuCell = ({ row, onEdit, onViewEvaluations, onSchedule, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div className="flex items-center justify-start">
            <div className="hidden md:flex gap-2">
                <Tooltip title="Editar usuário">
                    <IconButton onClick={() => onEdit(row.id)}>
                        <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-700 transition-colors" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Ver avaliações">
                    <IconButton onClick={() => onViewEvaluations(row.id)} >
                        <ClipboardDocumentListIcon className="h-5 w-5 text-cyan-700 hover:text-cyan-800 transition-colors" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Planejamento semanal">
                    <IconButton onClick={() => onSchedule(row.id)} >
                        <CalendarDaysIcon className="h-5 w-5 text-purple-700 hover:text-purple-800 transition-colors" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir usuário">
                    <IconButton onClick={() => onDelete(row.id)}>
                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-700 transition-colors" />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="block md:hidden">
                <IconButton onClick={handleMenuClick}>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-700" />
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
                    <MenuItem onClick={() => { onEdit(row.id); handleClose(); }}>
                        <PencilSquareIcon className="h-5 w-5 text-blue-600 mr-2" />
                        Editar usuário
                    </MenuItem>
                    <MenuItem onClick={() => { onViewEvaluations(row.id); handleClose(); }}>
                        <ClipboardDocumentListIcon className="h-5 w-5 text-cyan-700 mr-2" />
                        Ver avaliações
                    </MenuItem>
                    <MenuItem onClick={() => { onSchedule(row.id); handleClose(); }}>
                        <CalendarDaysIcon className="h-5 w-5 text-purple-700 mr-2" />
                        Planejamento
                    </MenuItem>
                    <Divider />

                    <MenuItem onClick={() => { onDelete(row.id); handleClose(); }}>
                        <TrashIcon className="h-5 w-5 text-red-600 mr-2" />
                        Excluir usuário
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default ActionMenuCell;
