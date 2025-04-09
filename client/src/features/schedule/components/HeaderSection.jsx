import { IconButton, Typography } from "@mui/material";
import { FaCheck, FaEdit } from "react-icons/fa";

const HeaderSection = ({ isEditing, onEditToggle, onSave }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <Typography variant="h4" className="text-[#c5e1e9]">
                Planejamento Semanal
            </Typography>
            <IconButton
                onClick={isEditing ? onSave : onEditToggle}
                sx={{ color: "#c5e1e9" }}
                aria-label={isEditing ? "Salvar planejamento" : "Editar planejamento"}
            >
                {isEditing ? <FaCheck size={24} /> : <FaEdit size={24} />}
            </IconButton>
        </div>
    );
};

export default HeaderSection;