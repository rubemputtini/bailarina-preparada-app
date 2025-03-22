import { Box, Typography } from "@mui/material";

const CalendarSummary = ({ uniqueDaysTrained }) => {
    const getEmoji = () => {
        if (uniqueDaysTrained > 20) return "🏆";
        if (uniqueDaysTrained > 15) return "😍";
        if (uniqueDaysTrained > 5) return "💙";
        return "🙂";
    };

    return (
        <Box
            sx={{
                backgroundColor: "#D9ECFF",
                marginTop: "24px",
                padding: "16px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
                textAlign: "center",
            }}
        >
            {uniqueDaysTrained === 0 ? (
                <Typography variant="body1" sx={{ color: "#6a1b9a" }}>
                    Você ainda <strong>não treinou</strong> este mês! 🥺
                </Typography>
            ) : (
                <>
                    <Typography variant="body1" sx={{ color: "#6a1b9a" }}>
                        Você treinou:{" "}
                        <strong>
                            {uniqueDaysTrained} {uniqueDaysTrained === 1 ? "dia" : "dias"}
                        </strong>{" "}
                        este mês! {getEmoji()}
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default CalendarSummary;