import { Box, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TrophyIcon } from "@heroicons/react/24/solid";
import AchievementBadge from "shared/components/AchievementBadge";
import ResponsiveUserName from "shared/components/ResponsiveUserName";

const TopRankingCard = ({ user, index, getMedalColor }) => {
    const color = getMedalColor(index);
    const achievements = user.achievements || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
        >
            <Card
                className="shadow-xl rounded-2xl h-full border-2 flex flex-col justify-between"
                style={{ borderColor: color }}
            >
                <CardContent className="text-center p-6 flex flex-col items-center justify-center">
                    <TrophyIcon style={{ width: 48, height: 48, fill: color }} />
                    <ResponsiveUserName
                        name={user.userName}
                        variant="h6"
                        className="font-bold mx-auto text-center mt-2"
                        mobileOnlyTruncate
                    />

                    <Typography
                        variant="h5"
                        className="mt-3"
                        sx={{ fontWeight: "600", color: "#9c27b0" }}
                    >
                        {user.daysTrained} {user.daysTrained === 1 ? "dia" : "dias"}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600">
                        {user.trainingsCompleted}{" "}
                        {user.trainingsCompleted === 1 ? "treino" : "treinos"}
                    </Typography>
                </CardContent>

                <Box
                    className="w-full"
                    sx={{ display: "flex", justifyContent: "center", gap: 1 }}
                >
                    {achievements.map((a) => (
                        <AchievementBadge key={a.achievementId} title={a.title} />
                    ))}
                </Box>
            </Card>
        </motion.div>
    );
};

export default TopRankingCard;
