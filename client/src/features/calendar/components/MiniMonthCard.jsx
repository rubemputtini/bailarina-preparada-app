import { Box, Typography, Tooltip } from "@mui/material";
import { getColorByCount } from "shared/utils/colors";
import { weekDayLabels } from "shared/utils/constants";

const MiniMonthCard = ({ monthIndex, label, isCurrentMonth, generateDays, onClick }) => {
    const days = generateDays(monthIndex);

    return (
        <Box
            onClick={onClick}
            sx={{
                cursor: "pointer",
                "&:hover": {
                    boxShadow: "0 0 8px rgba(255,255,255,0.3)",
                    transform: "scale(1.02)",
                },
                border: isCurrentMonth ? '1px solid var(--color-light-purple)' : 'none',
                borderRadius: 2,
                p: 1,
                transition: 'all 0.3s ease',
            }}
        >
            <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", mb: 1, fontWeight: 600, color: "#e0e0e0" }}
            >
                {label}
            </Typography>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                fontSize: 10,
                mb: 0.5,
                color: '#888',
                textAlign: 'center'
            }}>
                {weekDayLabels.map((d, i) => (
                    <Box key={i}>{d}</Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 0.5,
                    justifyItems: "center"
                }}
            >
                {days.map((item, i) => (
                    <Tooltip key={i} title={item?.count ? `${item.count} treino${item.count > 1 ? 's' : ''}` : ""} arrow>
                        <Box
                            sx={{
                                width: { xs: 10, sm: 12, md: 14 },
                                height: { xs: 10, sm: 12, md: 14 },
                                borderRadius: "50%",
                                backgroundColor: getColorByCount(item?.count),
                                opacity: item ? 1 : 0,
                                transition: "background-color 0.3s ease"
                            }}
                        />
                    </Tooltip>
                ))}
            </Box>
        </Box>
    );
};

export default MiniMonthCard;
