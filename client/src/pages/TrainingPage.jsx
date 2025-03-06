import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    MenuItem,
    Grid,
    Alert,
    CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import SuccessDialog from "../components/dialogs/SuccessDialog";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { createTraining } from "../services/trainingService";
import { trainingCategories } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const TrainingPage = () => {
    const today = new Date().toISOString().split("T")[0];
    const [newTraining, setNewTraining] = useState({
        date: today,
        category: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const handleCreateTraining = async () => {
        if (!newTraining.date || !newTraining.category) {
            setError("A data e a categoria são obrigatórias.");
            return;
        }
        setLoading(true);
        try {
            await createTraining(
                newTraining.date,
                newTraining.category,
                newTraining.description
            );
            setSuccess(true);
            setNewTraining({ date: today, category: "", description: "" });
            setError("");
        } catch (err) {
            setError("Erro ao registrar treino. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleDialogClose = () => {
        setSuccess(false);
        navigate("/dashboard");
    };

    return (
        <>
            <Nav />
            <Box
                sx={{
                    padding: "32px",
                    minHeight: "100vh",
                }}
            >
                <Box
                    sx={{
                        maxWidth: "400px",
                        width: "100%",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                        padding: "24px",
                        margin: "0 auto",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", color: "#4A148C", marginBottom: "16px" }}
                        align="center"
                    >
                        Registrar Novo Treino
                    </Typography>

                    {loading ? (
                        <Box display="flex" justifyContent="center" my={3}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Data"
                                        type="date"
                                        value={newTraining.date}
                                        onChange={(e) =>
                                            setNewTraining((prev) => ({ ...prev, date: e.target.value }))
                                        }
                                        fullWidth
                                        InputProps={{ inputProps: { max: today } }}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Categoria"
                                        value={newTraining.category}
                                        onChange={(e) =>
                                            setNewTraining((prev) => ({ ...prev, category: e.target.value }))
                                        }
                                        fullWidth
                                        select
                                        required
                                    >
                                        {trainingCategories.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Descrição"
                                        value={newTraining.description}
                                        onChange={(e) =>
                                            setNewTraining((prev) => ({ ...prev, description: e.target.value }))
                                        }
                                        fullWidth
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                            </Grid>

                            {error && (
                                <Alert severity="error" sx={{ marginTop: "16px" }}>
                                    {error}
                                </Alert>
                            )}
                            <Box display="flex" justifyContent="center" mt={3}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#4A148C",
                                        color: "#FFFFFF",
                                        fontWeight: "bold",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        padding: "8px 16px",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                        transition: "transform 0.2s",
                                        "&:hover": {
                                            backgroundColor: "#6A1B9A",
                                            transform: "scale(1.02)",
                                        },
                                    }}
                                    onClick={handleCreateTraining}
                                >
                                    <CheckCircle /> Registrar
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
                {success && (
                    <SuccessDialog
                        message="Treino registrado com sucesso!"
                        onClose={handleDialogClose}
                    />
                )}
            </Box>
            <Footer />
        </>
    );
};

export default TrainingPage;
