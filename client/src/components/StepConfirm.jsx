import { Typography, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const StepConfirm = ({ handleSave, loading }) => {
    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px" }}>
                Quer registrar o treino?
            </Typography>
            <Button
                variant="contained"
                startIcon={<CheckCircle />}
                onClick={handleSave}
                disabled={loading}
                sx={{
                    borderRadius: "12px",
                    backgroundColor: "#00C853",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    padding: "12px 24px",
                    fontSize: "18px",
                    "&:hover": { backgroundColor: "#00B53D" }
                }}
            >
                {loading ? "Salvando..." : "TREINO CONCLUÍDO"}
            </Button>
        </>
    );
};

export default StepConfirm;
