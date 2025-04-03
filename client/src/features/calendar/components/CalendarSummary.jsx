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
                <>
                    <Typography variant="body1" sx={{ color: "#6a1b9a" }}>
                        Você ainda <strong>não treinou</strong> este mês!
                    </Typography>
                    <img src={sad} alt="triste" className="w-6 h-6" />
                </>
            ) : (
                <>
                    <Typography variant="body1" sx={{ color: "#6a1b9a" }}>
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