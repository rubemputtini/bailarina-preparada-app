import { Box, Typography, Button } from "@mui/material";
import { trainingCategories } from "../../utils/constants";

const StepCategory = ({ newTraining, setNewTraining, error, setError }) => {
    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px" }}>
                Qual foi seu treino?
            </Typography>
            <Box sx={{ display: "grid", gap: "12px" }}>
                {trainingCategories.map(({ name, icon }) => (
                    <Button
                        key={name}
                        variant="outlined"
                        onClick={() => setNewTraining({ ...newTraining, category: name })}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            justifyContent: "center",
                            padding: "12px",
                            borderRadius: "24px",
                            border: "2px solid #6A1B9A",
                            backgroundColor: newTraining.category === name ? "#6A1B9A" : "#9575cd",
                            color: "#FFFFFF",
                            "&:hover": { backgroundColor: "#6A1B9A" },
                        }}
                    >
                        {icon} {name}
                    </Button>
                ))}
            </Box>
            {error && (
                <Typography sx={{ color: "#FF5252", fontSize: "16px", marginTop: "8px" }}>
                    Escolha uma categoria!
                </Typography>
            )}
        </>
    );
};

export default StepCategory;
