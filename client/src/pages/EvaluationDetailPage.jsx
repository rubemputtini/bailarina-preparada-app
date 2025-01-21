import { useEffect, useState } from "react";
import {
    Tabs,
    Tab,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Divider,
    Box,
    CircularProgress,
} from "@mui/material";
import { getEvaluationById } from "../services/evaluationService";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const EvaluationDetailPage = () => {
    const { evaluationId } = useParams();
    const [evaluation, setEvaluation] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("FMS");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const data = await getEvaluationById(evaluationId);
                setEvaluation(data);
            } catch (error) {
                console.error("Erro ao carregar avaliação:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvaluation();
    }, [evaluationId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" my={22}>
                <CircularProgress />
            </Box>
        );
    }

    if (!evaluation) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    padding: 4,
                }}
            >
                <Typography variant="h5">Erro ao carregar a avaliação.</Typography>
            </Box>
        );
    }

    const { adminName, userName, date, exercises } = evaluation;
    const filteredExercises = exercises.filter(
        (ex) => ex.exercise.category === selectedCategory
    );

    return (
        <>
            <Nav />
            <Box
                sx={{
                    padding: "40px 16px",
                    minHeight: "100vh",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "24px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            color: "#302539",
                            marginBottom: "24px",
                        }}
                    >
                        Detalhes da Avaliação
                    </Typography>
                    <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                        <strong>Nome:</strong> {userName}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                        <strong>Responsável:</strong> {adminName}
                    </Typography>
                    <Typography sx={{ marginBottom: 2 }}>
                        <strong>Data:</strong>{" "}
                        {new Date(date).toLocaleDateString("pt-BR")}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <Typography sx={{ marginBottom: 2 }}>
                        <strong>Pontuação Final:</strong>{" "}
                        {exercises.reduce((acc, ex) => acc + ex.score, 0)}
                    </Typography>
                    <Typography sx={{ marginBottom: 4 }}>
                        <strong>Ideal:</strong> {">"} 14 |{" "}
                        <strong>Maior Risco:</strong> {"<"} 14
                    </Typography>

                    <Tabs
                        value={selectedCategory}
                        onChange={(e, newValue) => setSelectedCategory(newValue)}
                        centered
                        TabIndicatorProps={{ style: { backgroundColor: "#4A148C" } }}
                        sx={{
                            marginBottom: 4,
                            "& .MuiTab-root": {
                                "&.Mui-selected": {
                                    color: "#8E24AA",
                                },
                            },
                        }}
                    >
                        <Tab label="FMS Adaptado" value="FMS" />
                        <Tab label="Capacidades Físicas" value="CapacidadesFisicas" />
                    </Tabs>

                    <Table sx={{ marginTop: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                                    Exercício
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                                    Pontuação
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                                    Observação
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredExercises.map((exercise, index) => (
                                <TableRow key={index}>
                                    <TableCell>{exercise.exercise.name}</TableCell>
                                    <TableCell>{exercise.score}</TableCell>
                                    <TableCell>
                                        {exercise.observation || "—"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default EvaluationDetailPage;
