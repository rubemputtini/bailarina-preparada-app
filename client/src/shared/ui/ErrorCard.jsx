import { Box, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const ErrorCard = ({
    message = "Ocorreu um erro.",
    centered = true,
    maxWidth = "600px",
    iconSize = 28,
    fontSize = 16,
    fontWeight = 500,
    borderColor = "#f44336",
    sx = {},
    className = "",
}) => {
    return (
        <Box
            sx={{
                backgroundColor: "#fff1f2",
                borderLeft: `5px solid ${borderColor}`,
                borderRadius: 2,
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                boxShadow: 2,
                maxWidth,
                margin: centered ? "2rem auto" : undefined,
                ...sx,
            }}
            className={className}
        >
            <ReportProblemIcon sx={{ color: borderColor, fontSize: iconSize, mr: 1.5 }} />
            <Typography
                sx={{
                    color: "#b71c1c",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize,
                    fontWeight,
                }}
            >
                {message}
            </Typography>
        </Box>
    );
};

export default ErrorCard;