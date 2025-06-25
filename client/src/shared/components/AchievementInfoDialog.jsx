import { Box, Modal, Typography } from "@mui/material";
import { motion } from "framer-motion";

const AchievementInfoDialog = ({ open, onClose, title, description, icon }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[32px] w-[90vw] max-w-[420px] shadow-xl"
                sx={{
                    background: "linear-gradient(180deg, #F4F0FA 0%, #FFFFFF 100%)",
                    border: "1px solid #e5e5f0",
                    p: { xs: 4, sm: 5 },
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center text-center"
                >
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#E5D4FF] to-[#CBAEFF] border-[3px] border-yellow-400 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center mb-6">
                        <img
                            src={icon}
                            alt={title}
                            className="w-32 h-32 rounded-full object-contain"
                        />
                    </div>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            color: "#6C3DB4",
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: "#555",
                        }}
                    >
                        {description}
                    </Typography>
                </motion.div>
            </Box>
        </Modal>
    );
};

export default AchievementInfoDialog;
