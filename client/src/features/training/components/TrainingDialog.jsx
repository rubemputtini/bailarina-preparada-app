import { Box, Typography, Modal } from "@mui/material";
import biceps from "assets/biceps.png";
import heart from "assets/heart.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "shared/routes/routes";
import ShareDialog from "./ShareDialog";
import DialogButton from "shared/buttons/DialogButton";

const TrainingDialog = ({ showDialog, setShowDialog, category, trainingDaysCount }) => {
    const [openShare, setOpenShare] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setShowDialog(false);
        navigate(ROUTES.dashboard);
    };

    return (
        <>
            <Modal open={showDialog} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "95%", sm: "420px" },
                        backgroundColor: "#3D1A66",
                        padding: "24px",
                        borderRadius: "20px",
                        textAlign: "center",
                        color: "#FFFFFF",
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        Treino concluído com sucesso!
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "16px",
                            lineHeight: "1.5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            mb: 4,
                        }}
                    >
                        Constância e Paciência!
                        <img src={heart} alt="Coração" className="w-5 h-5" />
                        <img src={biceps} alt="Bíceps" className="w-5 h-5" />
                    </Typography>

                    <Box className="flex justify-center gap-4 mt-6">
                        <DialogButton onClick={handleClose} variant="secondary" >
                            VOLTAR
                        </DialogButton>
                        <DialogButton onClick={() => {
                            setShowDialog(false);
                            setOpenShare(true);
                        }}>
                            COMPARTILHAR
                        </DialogButton>


                    </Box>
                </Box>
            </Modal>

            <ShareDialog
                open={openShare}
                onClose={() => setOpenShare(false)}
                category={category}
                trainingDaysCount={trainingDaysCount}
            />
        </>
    );
};

export default TrainingDialog;