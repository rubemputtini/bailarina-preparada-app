import { Box, Typography } from "@mui/material";
import AchievementBadge from "shared/components/AchievementBadge";
import ResponsiveUserName from "shared/components/ResponsiveUserName";

const RankingRow = ({ user, rank, isCurrentUser, isEven }) => {
    return (
        <Box className={`p-2 my-1 rounded-lg flex items-center justify-between transition-all duration-300 ${isCurrentUser
            ? "bg-light-blue"
            : isEven
                ? "bg-gray-50"
                : "bg-white"
            }`}>
            <Box className="flex items-center gap-2">
                <Box className="text-[#9c27b0] font-bold w-6 text-center text-lg">{rank}</Box>
                <ResponsiveUserName
                    name={user.userName}
                    variant="subtitle1"
                    className="font-medium text-sm"
                    mobileOnlyTruncate
                />

                <Box className="flex justify-center mt-2">
                    {user.achievements?.map((a) => (
                        <AchievementBadge key={a.achievementId} title={a.title} />
                    ))}

                </Box>
            </Box>
            <Box className="text-right leading-tight">
                <Typography
                    variant="body2"
                    sx={{ fontWeight: "700", color: "#9c27b0" }}
                >
                    {user.daysTrained} {user.daysTrained === 1 ? "dia" : "dias"}
                </Typography>
                <Typography variant="caption" className="text-gray-500 text-xs">
                    {user.trainingsCompleted}{" "}
                    {user.trainingsCompleted === 1 ? "treino" : "treinos"}
                </Typography>
            </Box>
        </Box>
    );
};

export default RankingRow;
