import { Tooltip, useMediaQuery } from "@mui/material";
import { useState } from "react";
import AchievementInfoDialog from "./AchievementInfoDialog";

const AchievementBadge = ({ title, description, icon }) => {
    const isDesktop = useMediaQuery("(hover: hover) and (pointer: fine)");
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (!isDesktop) setOpen(true);
    };

    const handleOpenDialog = () => setOpen(true);
    const handleCloseDialog = () => setOpen(false);

    return (
        <>
            <Tooltip title={title} arrow disableHoverListener={!isDesktop}>
                <span
                    onClick={isDesktop ? handleOpenDialog : handleClick}
                    className="mx-1 block cursor-pointer"
                >
                    <img
                        src={icon}
                        alt={title}
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-sm object-cover"
                    />
                </span>
            </Tooltip>

            <AchievementInfoDialog
                open={open}
                onClose={handleCloseDialog}
                title={title}
                description={description}
                icon={icon}
            />
        </>
    );
};

export default AchievementBadge;
