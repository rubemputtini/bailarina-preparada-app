import React, { useState, useEffect } from "react";
import { Box, LinearProgress, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { createTraining } from "../services/trainingService";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import StepDate from "../components/training/StepDate";
import StepCategory from "../components/training/StepCategory";
import StepDescription from "../components/training/StepDescription";
import StepConfirm from "../components/training/StepConfirm";
import TrainingDialog from "../components/dialogs/TrainingDialog";
import { trainingCategories } from "../utils/constants";

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

    useEffect(() => {
        if (success) {
            setShowDialog(true);
            setTimeout(() => {
                setShowDialog(false);
                navigate("/dashboard");
            }, 5000);
        }
    }, [success, navigate]);

    const handleNext = () => {
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
        } catch (err) {
            alert("Erro ao registrar treino. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <Box sx={{ minHeight: "100vh", padding: "32px" }}>
                <Box sx={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
                    <Box sx={{
                        backgroundColor: "#c5e1e9",
                        borderRadius: "32px",
                        padding: "24px",
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                    }}>
                        <LinearProgress
                            variant="determinate"
                            value={(step / 4) * 100}
                            sx={{
                                marginBottom: "16px",
                                borderRadius: "8px",
                                height: "8px",
                                backgroundColor: "#FFFFFF",
                                "& .MuiLinearProgress-bar": { backgroundColor: "#00C853" }
                            }}
                        />

                        {step === 1 && <StepDate newTraining={newTraining} setNewTraining={setNewTraining} today={today} />}
                        {step === 2 && <StepCategory newTraining={newTraining} setNewTraining={setNewTraining} error={error} setError={setError} trainingCategories={trainingCategories} />}
                        {step === 3 && <StepDescription newTraining={newTraining} setNewTraining={setNewTraining} />}
                        {step === 4 && <StepConfirm handleSave={handleSave} loading={loading} />}

                        <Box
                            display="flex"
                            justifyContent={step === 1 ? "flex-end" : "space-between"}
                            alignItems="center"
                            mt={3}
                        >
                            {step > 1 && (
                                <IconButton onClick={handleBack} sx={{ color: "#323232" }}>
                                    <ArrowBackIosNew fontSize="large" />
                                </IconButton>
                            )}
                            {step < 4 && (
                                <IconButton onClick={handleNext} sx={{ color: "#323232" }}>
                                    <ArrowForwardIos fontSize="large" />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
            {success && <Confetti numberOfPieces={500} recycle={false} />}
            <TrainingDialog showDialog={showDialog} setShowDialog={setShowDialog} />
        </>
    );
};

export default TrainingPage;
