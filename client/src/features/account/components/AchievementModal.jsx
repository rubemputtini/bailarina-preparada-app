import { Box, Modal, Typography } from "@mui/material";
import { motion } from "framer-motion";
import logo from "assets/logo.png";

const AchievementModal = ({ open, onClose, achievement }) => {
    if (!achievement) return null;

    const {
        title,
        description,
        unlocked,
        achievedAt,
        currentProgress,
        goalTarget
    } = achievement;

    const showProgress = !unlocked && currentProgress != null && goalTarget != null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl px-6 pt-8 pb-6 w-[90vw] max-w-[400px] shadow-2xl border border-gray-100">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-200 to-purple-100 flex items-center justify-center mb-5 shadow-md">
                        <img src={logo} alt={title} className="w-32 h-32 rounded-full" />
                    </div>

                    <Typography variant="h6" className="font-bold text-purple-800" sx={{ marginBottom: 2 }}>
                        {title}
                    </Typography>

                    <Typography className="text-gray-600 leading-snug" sx={{ marginBottom: 1 }}>
                        {description}
                    </Typography>

                    {showProgress && (
                        <div className="w-full mb-5">
                            <Typography className="text-sm text-gray-700 font-medium" sx={{ marginBottom: 1 }}>
                                Progresso atual: <span className="text-purple-700 font-bold">{currentProgress} / {goalTarget}</span>
                            </Typography>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min((currentProgress / goalTarget) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {unlocked ? (
                        <Typography className="text-emerald-600 text-sm font-semibold">
                            Conquistado em {new Date(achievedAt).toLocaleDateString("pt-BR")}
                        </Typography>
                    ) : (
                        <Typography className="text-gray-400 text-sm italic">
                            Ainda não conquistado
                        </Typography>
                    )}
                </motion.div>
            </Box>
        </Modal>
    );
};

export default AchievementModal;
