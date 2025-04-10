import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ErrorCard from "shared/ui/ErrorCard";

const StepConfirm = ({ handleSave, loading, error }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <Typography variant="h6" sx={{ color: "#323232", textAlign: "center" }}>
                Quer registrar o treino?
            </Typography>

            <Button
                onClick={handleSave}
                disabled={loading}
                startIcon={!loading && <CheckCircleIcon className="w-6 h-6" />}
                sx={{
                    width: "100%",
                    maxWidth: "320px",
                    padding: "14px 24px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "20px",
                    textTransform: "none",
                    backgroundColor: "#00C853",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(0, 200, 83, 0.3)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: "#00B347",
                        transform: "scale(1.02)",
                        boxShadow: "0 6px 16px rgba(0, 200, 83, 0.4)",
                    },
                    "&:disabled": {
                        backgroundColor: "#A5D6A7",
                        color: "#fff",
                    },
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "REGISTRAR AGORA"}
            </Button>

            {error && <ErrorCard message={error} />}
        </Box>
    );
};

export default StepConfirm;