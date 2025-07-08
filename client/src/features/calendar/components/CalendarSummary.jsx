import { Box, Typography } from "@mui/material";
import trophy from '../../../assets/trophy.png';
import love from '../../../assets/love.png';
import heart from '../../../assets/heart.png';
import sad from '../../../assets/sad.png';
import happiness from '../../../assets/happiness.png';

const CalendarSummary = ({ uniqueDaysTrained }) => {
    const getIcon = () => {
        if (uniqueDaysTrained > 20) return trophy;
        if (uniqueDaysTrained > 15) return love;
        if (uniqueDaysTrained > 5) return heart;
        return happiness;
    };

    return (
        <Box
            sx={{
                background: "linear-gradient(to bottom right, #2a1c3f, #1e1e2e)",
                color: "#e0e0e0",
                mt: 3,
                px: 3,
                py: 2,
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                flexWrap: "wrap",
                textAlign: "center",
                maxWidth: "380px",
                mx: "auto",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)"
            }}
        >
            {uniqueDaysTrained === 0 ? (
                <>
                    <Typography variant="body1" sx={{ color: "#ffffff" }}>
                        Você ainda <strong>não treinou</strong> este mês!
                    </Typography>
                    <img src={sad} alt="triste" className="w-6 h-6" />
                </>
            ) : (
                <>
                    <Typography variant="body1" sx={{ color: "#ffffff" }}>
                        Você treinou:{" "}
                        <strong>
                            {uniqueDaysTrained} {uniqueDaysTrained === 1 ? "dia" : "dias"}
                        </strong>{" "}
                        este mês!
                    </Typography>
                    <img src={getIcon()} alt="ícone" className="w-6 h-6" />
                </>
            )}
        </Box>
    );
};

export default CalendarSummary;
