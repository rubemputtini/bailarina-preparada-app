import { Typography } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import logo from "assets/logo.png";
import AchievementModal from "./AchievementModal";

const AchievementCardPremium = ({ achievement }) => {
    const [open, setOpen] = useState(false);
    if (!achievement || !achievement.title) return null;

    const {
        title,
        description,
        unlocked,
        achievedAt,
        icon,
        timesAchieved,
        currentProgress,
        goalTarget
    } = achievement;


    const glow = unlocked ? "shadow-[0_0_16px_rgba(139,92,246,0.6)]" : "";
    const imageStyle = unlocked ? "" : "opacity-30 grayscale";

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setOpen(true)}
                className="cursor-pointer flex flex-col items-center text-center mb-2"
            >
                <div className={`rounded-full border-4 border-gray-300 ${glow}`}>
                    <img
                        src={logo}
                        alt={title}
                        className={`w-20 h-20 rounded-full ${imageStyle}`}
                    />
                </div>

                <Typography
                    variant="subtitle2"
                    className="text-sm font-medium text-gray-800 mt-2 leading-snug"
                >
                    {title}
                </Typography>

                {unlocked && (
                    <Typography className="text-xs text-gray-400 mt-1">
                        {new Date(achievedAt).toLocaleDateString("pt-BR")}
                    </Typography>
                )}

                {timesAchieved > 1 && (
                    <div className="text-[10px] bg-purple-100 text-purple-800 px-2 py-[2px] rounded-full mt-1 inline-block">
                        {timesAchieved}x
                    </div>
                )}
            </motion.div>

            <AchievementModal open={open} onClose={() => setOpen(false)} achievement={achievement} />
        </>
    );
};

export default AchievementCardPremium;
