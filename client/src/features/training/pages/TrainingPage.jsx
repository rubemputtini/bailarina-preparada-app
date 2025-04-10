import React, { useState, useEffect } from "react";
import { Box, LinearProgress, IconButton } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import { createTraining } from "../services/trainingService";
import Nav from "../../../layouts/Nav";
import Footer from "../../../layouts/Footer";
import StepDate from "../components/StepDate";
import StepCategory from "../components/StepCategory";
import StepDescription from "../components/StepDescription";
import StepConfirm from "../components/StepConfirm";
import TrainingDialog from "../components/TrainingDialog";
import { trainingCategories } from "shared/utils/constants";
import { ROUTES } from "shared/routes/routes";

const TrainingPage = () => {
    const [step, setStep] = useState(1);
    const today = new Date().toISOString().split("T")[0];
    const [newTraining, setNewTraining] = useState({
        date: today,
        category: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (success) {
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
                navigate(ROUTES.dashboard);
            }, 5000);
        }
    }, [success, navigate]);

    const handleNext = () => {
        if (step === 1 && !newTraining.date) {
            setError("Selecione uma data válida.");
            return;
        }

        if (step === 2 && !newTraining.category) {
            setError(true);
            return;
        }

        setError(false);
        setStep((prev) => prev + 1);
    };

    const handleBack = () => setStep((prev) => prev - 1);

    const handleSave = async () => {
        setLoading(true);
        try {
            await createTraining(newTraining.date, newTraining.category, newTraining.description);
            setSuccess(true);
            setError("");
        } catch (err) {
            setError("Erro ao registrar treino. Tente novamente.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <Box sx={{ minHeight: "100vh", padding: "24px" }}>
                <Box sx={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                    <Box
                        sx={{
                            backgroundColor: "#f4f0fa",
                            borderRadius: "32px",
                            padding: "24px",
                            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                        }}
                    >
                        <LinearProgress
                            variant="determinate"
                            value={(step / 4) * 100}
                            sx={{
                                height: 10,
                                borderRadius: "10px",
                                backgroundColor: "#e0e0e0",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: "10px",
                                    background: "linear-gradient(90deg, #6C3DB4 0%, #B388FF 100%)",
                                    transition: "all 0.3s ease-in-out",
                                },
                                marginBottom: "24px",
                            }}
                        />

                        {step === 1 && <StepDate newTraining={newTraining} setNewTraining={setNewTraining} today={today} error={error} />}
                        {step === 2 && <StepCategory newTraining={newTraining} setNewTraining={setNewTraining} error={error} trainingCategories={trainingCategories} />}
                        {step === 3 && <StepDescription newTraining={newTraining} setNewTraining={setNewTraining} />}
                        {step === 4 && <StepConfirm handleSave={handleSave} loading={loading} error={error} />}

                        <Box
                            display="flex"
                            justifyContent={step === 1 ? "flex-end" : "space-between"}
                            alignItems="center"
                            mt={3}
                        >
                            {step > 1 && (
                                <IconButton onClick={handleBack} sx={{ color: "#323232" }}>
                                    <ChevronLeftIcon className="w-6 h-6" />
                                </IconButton>
                            )}
                            {step < 4 && (
                                <IconButton onClick={handleNext} sx={{ color: "#323232" }}>
                                    <ChevronRightIcon className="w-6 h-6" />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
            {success && <Confetti numberOfPieces={500} recycle={false} width={width} height={height} />}
            <TrainingDialog showDialog={showDialog} setShowDialog={setShowDialog} />
        </>
    );
};

export default TrainingPage;
