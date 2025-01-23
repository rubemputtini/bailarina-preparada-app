import { Box, Typography } from "@mui/material";

const CalendarSummary = ({ uniqueDaysTrained }) => {
    const getEmoji = () => {
        if (uniqueDaysTrained > 20) return "🏆";
        if (uniqueDaysTrained > 15) return "😍";
        if (uniqueDaysTrained > 5) return "💙";
        if (uniqueDaysTrained === 0) return "🥺";
        return "🙂";
    };

    return (
        <Box
            sx={{
                backgroundColor: "#F0F0F0",
                marginTop: "24px",
                padding: "16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
            }}
        >
            <Typography variant="h6" sx={{ color: "#4A148C" }}>
                Você treinou: <strong>{uniqueDaysTrained} dia(s) este mês</strong>
            </Typography>
            <Typography variant="h6" sx={{ color: "#4A148C" }}>
                {getEmoji()}
            </Typography>
        </Box>
    );
};

export default CalendarSummary;