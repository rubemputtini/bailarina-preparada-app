import { Card, CardContent, Typography } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { motion } from "framer-motion";

const TopRankingCard = ({ user, index, getMedalColor }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
        >
            <Card className="shadow-xl rounded-2xl h-full">
                <CardContent className="text-center p-6 flex flex-col items-center justify-center">
                    <EmojiEvents sx={{ fontSize: 48, color: getMedalColor(index) }} />
                    <Typography variant="h6" className="font-bold mt-2">
                        {user.userName}
                    </Typography>
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
            </Card>
        </motion.div>
    );
};

export default TopRankingCard;
