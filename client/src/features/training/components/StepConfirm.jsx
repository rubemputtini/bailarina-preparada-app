import { Typography, Button, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import ErrorCard from "shared/ui/ErrorCard";

const StepConfirm = ({ handleSave, loading, error }) => {
    return (
        <>
            <Typography variant="h6" sx={{ color: "#323232", marginBottom: "16px" }}>
                Quer registrar o treino?
            </Typography>
            <Button
                variant="contained"
                startIcon={!loading && <CheckCircle />}
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
                {loading ? <CircularProgress size={24} color="inherit" /> : "REGISTRAR AGORA"}
            </Button>

            {error && (
                <ErrorCard message={error} />
            )}
        </>
    );
};

export default StepConfirm;
