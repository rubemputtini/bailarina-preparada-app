import { CircularProgress, Box } from "@mui/material";

const LoadingCard = ({
    size = 32,
    color = "inherit",
    fullScreen = false,
    marginY = 10,
    className = "",
}) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            my={marginY}
            minHeight={fullScreen ? "80vh" : "unset"}
            className={className}
        >
            <CircularProgress size={size} sx={{ color }} />
        </Box>
    );
};

export default LoadingCard;