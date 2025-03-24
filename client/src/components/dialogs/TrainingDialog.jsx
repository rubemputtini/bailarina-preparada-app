import { Box, Typography, Modal } from "@mui/material";
import biceps from "../../assets/biceps.png";
import heart from "../../assets/heart.png";

const TrainingDialog = ({ showDialog, setShowDialog }) => {
    return (
        <Modal open={showDialog} onClose={() => setShowDialog(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", sm: "400px" },
                    backgroundColor: "#3D1A66",
                    padding: "24px",
                    borderRadius: "20px",
                    textAlign: "center",
                    color: "#FFFFFF",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "0.5em" }}>
                    Treino concluído com sucesso!
                </Typography>
                <Typography sx={{ fontSize: "18px", lineHeight: "1.5", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                    Constância e Paciência!
                    <img src={heart} alt="Coração" className="w-6 h-6" />
                    <img src={biceps} alt="Bíceps" className="w-6 h-6" />
                </Typography>
            </Box>
        </Modal>
    );
};

export default TrainingDialog;
