import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserEvaluations } from "../services/adminService";
import {
    Box,
    Card,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Avatar,
    Divider,
    IconButton
} from "@mui/material";
import dayjs from "dayjs";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import { Edit } from "@mui/icons-material";
import { updateEvaluation } from "../services/evaluationService";

const UserDetailsPage = () => {
    const { userId } = useParams();
    const [evaluations, setEvaluations] = useState([]);
    const [selectedEvaluation, setSelectedEvaluation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedExercises, setUpdatedExercises] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const data = await getUserEvaluations(userId);
                setEvaluations(data);
            } catch (error) {
                setError("Erro ao carregar avaliações.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluations();
    }, [userId]);

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleEvaluationClick = (evaluation) => {
        setSelectedEvaluation(evaluation);
        setUpdatedExercises(
            evaluation.exercises.map((exercise) => ({
                exerciseId: exercise.exerciseId,
                score: exercise.score,
            }))
        );
    };

    const handleUpdateScore = (index, newScore) => {
        const updated = [...updatedExercises];
        updated[index].score = newScore;
        setUpdatedExercises(updated);
    };

    const handleSaveEdit = () => {
        updateEvaluation(selectedEvaluation.evaluationId, updatedExercises);
        const data = getUserEvaluations(userId);
        setEvaluations(data);

        setIsEditing(false);
        setSelectedEvaluation(null);
    };

    const handleCancelEdit = () => {
        setUpdatedExercises(
            selectedEvaluation.exercises.map((exercise) => ({
                exerciseId: exercise.exerciseId,
                score: exercise.score,
            }))
        );
        setIsEditing(false);
    };

    const handleCloseDialog = () => {
        setSelectedEvaluation(null);
    };

    if (loading) {
        return (
            <Box className="flex justify-center items-center min-h-screen">
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="flex justify-center items-center min-h-screen">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (evaluations.length === 0) {
        return (
            <Box className="flex justify-center items-center min-h-screen">
                <Typography variant="h6" color="white">
                    Nenhuma avaliação encontrada para este usuário.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Nav />
            <Box className="min-h-screen p-6">
                <Typography variant="h4" color="white" className="mb-6 text-center">
                    Avaliações de {evaluations[0]?.userName}
                </Typography>

                <Card className="bg-purple-800 p-4 mb-6 shadow-lg">
                    <Typography
                        variant="h6"
                        color="white"
                        className="text-center mb-4"
                    >
                        Clique em uma avaliação para ver os detalhes
                    </Typography>
                    <Box className="flex flex-wrap gap-4 justify-center">
                        {evaluations.map((evaluation) => (
                            <Card
                                key={evaluation.evaluationId}
                                className="bg-purple-700 text-white p-4 shadow-md cursor-pointer"
                                onClick={() => handleEvaluationClick(evaluation)}
                                sx={{
                                    maxWidth: "300px",
                                    '&:hover': { boxShadow: 6 },
                                }}
                            >
                                <Typography variant="h6" className="mb-2">
                                    {dayjs(evaluation.date).format("DD/MM/YYYY")}
                                </Typography>
                                <Typography variant="body2">
                                    Realizada por: {evaluation.adminName}
                                </Typography>
                            </Card>
                        ))}
                    </Box>
                </Card>

                {selectedEvaluation && (
                    <Dialog
                        open={Boolean(selectedEvaluation)}
                        onClose={handleCloseDialog}
                        maxWidth="md"
                        fullWidth
                    >
                        <DialogTitle>Detalhes da Avaliação</DialogTitle>
                        <DialogContent>
                            <Typography variant="h6" className="mb-4">
                                Realizada por: {selectedEvaluation.adminName}
                            </Typography>
                            <Typography className="mb-4">
                                Data:{" "}
                                {dayjs(selectedEvaluation.date).format("DD/MM/YYYY")}
                            </Typography>
                            <Divider className="mb-4" />
                            {selectedEvaluation.exercises.map((exercise, index) => (
                                <Box
                                    key={index}
                                    className="flex items-center gap-4 mb-4"
                                >
                                    <Avatar
                                        src={exercise.exercise.photoUrl}
                                        alt={exercise.exercise.name}
                                        variant="rounded"
                                        className="w-16 h-16"
                                    />
                                    <Box>
                                        <Typography variant="body1" className="font-bold">
                                            {exercise.exercise.name}
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-600">
                                            Categoria: {exercise.exercise.category}
                                        </Typography>
                                        {isEditing ? (
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Typography variant="body2" className="text-gray-600">
                                                    Pontuação:
                                                </Typography>
                                                <input
                                                    type="number"
                                                    value={updatedExercises[index]?.score || ''}
                                                    onChange={(e) =>
                                                        handleUpdateScore(index, parseInt(e.target.value, 10))
                                                    }
                                                    style={{ width: "60px", textAlign: "center" }}
                                                />
                                            </Box>
                                        ) : (
                                            <Typography variant="body2" className="text-gray-600">
                                                Pontuação: {exercise.score}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                            <Box className="flex justify-between mt-4">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={handleCancelEdit}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleSaveEdit}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Salvar
                                        </Button>
                                    </>
                                ) : (
                                    <IconButton
                                        color="primary"
                                        onClick={handleStartEditing}
                                    >
                                        <Edit />
                                    </IconButton>
                                )}
                            </Box>
                        </DialogContent>
                    </Dialog>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default UserDetailsPage;
