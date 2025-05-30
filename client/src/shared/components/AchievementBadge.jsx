import { Tooltip } from "@mui/material";
import logo from "assets/logo.png";

const AchievementBadge = ({ title }) => {
    return (
        <Tooltip title={title} arrow>
            <span className="mx-1 block">
                <img
                    src={logo}
                    alt={title}
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm object-cover"
                />
            </span>
        </Tooltip>
    );
};

export default AchievementBadge;
