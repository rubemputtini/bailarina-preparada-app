import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Box, CircularProgress } from "@mui/material";
import { getUserEvaluations } from "../services/adminService";
import { getUserId } from "../services/auth";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const EvaluationListPage = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(true); // Adicionar estado de carregamento
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const userId = getUserId();
                const data = await getUserEvaluations(userId);
                setEvaluations(data);
            } catch (error) {
                console.error("Erro ao carregar avaliações:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvaluations();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" my={22}>
                <CircularProgress />
            </Box>
        );
    }

    if (evaluations.length === 0) {
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
                <Typography variant="h5">Nenhuma avaliação encontrada...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Nav />
            <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: "#FFFFFF", fontWeight: "bold", marginBottom: 4 }}
                >
                    Avaliações Registradas
                </Typography>
                <Grid container spacing={4}>
                    {evaluations.map((evaluation) => (
                        <Grid item xs={12} sm={6} md={4} key={evaluation.evaluationId}>
                            <Card
                                sx={{
                                    borderRadius: "12px",
                                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                                    overflow: "hidden",
                                    backgroundColor: "#FFFFFF",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: "bold", color: "#4A148C" }}
                                    >
                                        {evaluation.userName}
                                    </Typography>
                                    <Typography sx={{ marginBottom: 1 }}>
                                        Data:{" "}
                                        <strong>
                                            {new Date(evaluation.date).toLocaleDateString(
                                                "pt-BR"
                                            )}
                                        </strong>
                                    </Typography>
                                    <Typography sx={{ marginBottom: 2 }}>
                                        Pontuação Final:{" "}
                                        <strong>
                                            {evaluation.exercises.reduce(
                                                (acc, ex) => acc + ex.score,
                                                0
                                            )}
                                        </strong>
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#4A148C",
                                            "&:hover": { backgroundColor: "#6A1B9A" },
                                            color: "#FFFFFF",
                                            width: "80%",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() =>
                                            navigate(`/avaliacao/${evaluation.evaluationId}`)
                                        }
                                    >
                                        DETALHES
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Footer />
        </>
    );
};

export default EvaluationListPage;
