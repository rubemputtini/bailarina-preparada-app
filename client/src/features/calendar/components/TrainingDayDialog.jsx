import React, { useCallback, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Modal,
    IconButton,
} from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getCategoryColor, trainingCategories } from "shared/utils/constants";
import DialogButton from "shared/buttons/DialogButton";
import ConfirmationDialog from "shared/dialogs/ConfirmationDialog";
import { deleteTraining, getTrainingsByDate } from "features/training/services/trainingService";
import SuccessDialog from "shared/dialogs/SuccessDialog";
import LoadingCard from "shared/ui/LoadingCard";

const TrainingDayDialog = ({ open, onClose, selectedDate, onTrainingChanged }) => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const [confirmingDelete, setConfirmingDelete] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const fetchTrainings = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getTrainingsByDate(selectedDate);
            setTrainings(result);
        } catch (error) {
            console.error("Erro ao carregar treinos do dia", error);
        } finally {
            setLoading(false);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (open && selectedDate) {
            fetchTrainings();
        }
    }, [open, selectedDate, fetchTrainings]);

    const handleDelete = async (trainingId) => {
        setDeleting(trainingId);
        try {
            await deleteTraining(trainingId);
            setShowSuccess(true);
        } catch (error) {
            console.error("Erro ao excluir treino", error);
        } finally {
            setDeleting(null);
            setConfirmingDelete(null);
        }
    };

    const handleSuccessClose = () => {
        setShowSuccess(false);
        if (onTrainingChanged) onTrainingChanged();
        onClose();
    };

    const formattedDate = new Date(selectedDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    background: "linear-gradient(to bottom right, #2a1c3f, #1e1e2e)",
                    color: "#ffffff",
                    maxWidth: 400,
                    width: "90%",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    p: 4,
                    borderRadius: "28px",
                    boxShadow: 24,
                    outline: "none",
                }}
            >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Treinos
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500, fontSize: "1rem", opacity: 0.85 }}>
                        {formattedDate}
                    </Typography>
                </Box>

                {loading ? (
                    <LoadingCard />
                ) : trainings.length === 0 ? (
                    <Typography variant="body2" sx={{ color: "#CCC", textAlign: "center" }}>
                        Nenhum treino registrado nesse dia.
                    </Typography>
                ) : (
                    trainings.map((training) => {
                        const { trainingId, category, description } = training;
                        const found = trainingCategories.find((c) => c.name === category);

                        return (
                            <Box
                                key={trainingId}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: getCategoryColor(category),
                                    color: "#1E1E1E",
                                    px: 2,
                                    py: 2,
                                    borderRadius: "20px",
                                    mb: 2,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                    position: "relative",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                    {found?.icon}
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                                        {category}
                                    </Typography>
                                </Box>

                                {description && (
                                    <Box sx={{
                                        px: 3,
                                        borderLeft: "3px solid rgba(0,0,0,0.2)",
                                        ml: 0.5,
                                    }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "13.5px",
                                                color: "#2e2e2e",
                                                fontStyle: "italic",
                                                my: 1
                                            }}
                                        >
                                            "{description}"
                                        </Typography>
                                    </Box>
                                )}

                                {training.feedbackMessage && (
                                    <Box
                                        sx={{
                                            ml: 0.5,
                                            mt: 1,
                                            pl: 3,
                                            borderLeft: "3px solid #6a1b9a",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: "13px",
                                                color: "#323232",
                                                fontWeight: 500,
                                                lineHeight: 1.6,
                                                mt: 1
                                            }}
                                        >
                                            “{training.feedbackMessage}”
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "block",
                                                textAlign: "right",
                                                mr: 1,
                                                color: "#6a1b9a",
                                                fontWeight: 600,
                                            }}
                                        >
                                            — Bella
                                        </Typography>
                                    </Box>
                                )}
                                <IconButton
                                    onClick={() => setConfirmingDelete(trainingId)}
                                    disabled={deleting === trainingId}
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        color: "#1E1E1E",
                                    }}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </IconButton>
                            </Box>
                        );
                    })
                )}

                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <DialogButton onClick={onClose} fullWidthOnMobile={false} variant="secondary">
                        FECHAR
                    </DialogButton>
                </Box>

                {!!confirmingDelete && (
                    <ConfirmationDialog
                        message="Tem certeza que deseja excluir este treino?"
                        onCancel={() => setConfirmingDelete(null)}
                        onConfirm={() => handleDelete(confirmingDelete)}
                        loading={deleting === confirmingDelete}
                    />
                )}

                {showSuccess && (
                    <SuccessDialog
                        message="Treino excluído com sucesso!"
                        onClose={handleSuccessClose}
                    />
                )}
            </Box>
        </Modal>
    );
};

export default TrainingDayDialog;
