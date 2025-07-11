import { Typography } from "@mui/material";

const PageTitle = ({ children }) => {
    return (
        <Typography
            variant="h4"
            sx={{
                fontWeight: "800",
                textAlign: "center",
                background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "24px",
                fontSize: { xs: "2rem", md: "2.5rem" },
            }}
        >
            {children}
        </Typography>
    );
};

export default PageTitle;
