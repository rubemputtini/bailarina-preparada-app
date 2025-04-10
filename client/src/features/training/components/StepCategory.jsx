import { Box, Typography, Button } from "@mui/material";
import ErrorCard from "shared/ui/ErrorCard";
import { trainingCategories, getCategoryColor } from "shared/utils/constants";

const StepCategory = ({ newTraining, setNewTraining, error }) => {
    const isAnySelected = !!newTraining.category;

    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px", textAlign: "center" }}>
                Qual foi seu treino?
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                }}
            >
                {trainingCategories.map(({ name, icon }) => {
                    const selected = newTraining.category === name;
                    const muted = isAnySelected && !selected;
                    return (
                        <Button
                            key={name}
                            onClick={() => setNewTraining({ ...newTraining, category: name })}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "12px",
                                borderRadius: "20px",
                                minHeight: "80px",
                                textTransform: "none",
                                fontWeight: 600,
                                backgroundColor: selected
                                    ? "#6C3DB4"
                                    : muted
                                        ? "#e4e4e4"
                                        : getCategoryColor(name),
                                color: selected ? "#ffffff" : "#1E1E1E",
                                boxShadow: selected ? "0 4px 16px rgba(0,0,0,0.2)" : "none",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                    backgroundColor: selected
                                        ? "#5A2C9B"
                                        : muted
                                            ? "#d8d8d8"
                                            : getCategoryColor(name) + "CC",
                                    transform: "scale(1.03)",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                },
                                outline: "none",
                                "&:focus": {
                                    outline: "none",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            {icon}
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 1,
                                    fontWeight: 500,
                                    fontSize: "13px",
                                    color: selected ? "#ffffff" : "#1E1E1E",
                                }}
                            >
                                {name}
                            </Typography>
                        </Button>
                    );
                })}
            </Box>

            {error && <ErrorCard message="Escolha uma categoria!" />}
        </>
    );
};

export default StepCategory;