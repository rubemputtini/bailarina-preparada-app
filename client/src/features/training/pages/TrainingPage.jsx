import React, { useState } from "react";
import { Box, LinearProgress, IconButton } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { createTraining } from "../services/trainingService";
import Nav from "../../../layouts/Nav";
import Footer from "../../../layouts/Footer";
import StepDate from "../components/StepDate";
import StepCategory from "../components/StepCategory";
import StepDescription from "../components/StepDescription";
import StepConfirm from "../components/StepConfirm";
import TrainingDialog from "../components/TrainingDialog";
import { trainingCategories } from "shared/utils/constants";
import useTrainingDaysCount from "hooks/useTrainingDaysCount";
import { getUserAchievements } from "features/ranking/services/achievementService";
import AchievementShareDialog from "features/account/components/AchievementShareDialog";

const TrainingPage = () => {
    const [step, setStep] = useState(1);
    const today = new Date().toISOString().split("T")[0];
    const [isDateValid, setIsDateValid] = useState(true);
    const [newTraining, setNewTraining] = useState({
        date: today,
        category: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [error, setError] = useState(false);
    const [achievementToShare, setAchievementToShare] = useState(null);

    const { width, height } = useWindowSize();
    const { trainingDaysCount, refetch } = useTrainingDaysCount();

    const handleNext = () => {
        if (step === 1 && (!newTraining.date || !isDateValid)) {
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
            const before = await getUserAchievements();
            const unlockedBefore = before.filter(a => a.unlocked).map(a => a.achievementId);

            await createTraining(newTraining.date, newTraining.category, newTraining.description);
            await refetch();

            const after = await getUserAchievements();
            const newAchievements = after.filter(
                a => a.unlocked && !unlockedBefore.includes(a.achievementId)
            );

            if (newAchievements.length > 0) {
                setAchievementToShare(newAchievements[0]);
            } else {
                setShowDialog(true);
            }

            setError("");
        } catch (err) {
            setError("Erro ao registrar treino. Tente novamente.");
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

                        {step === 1 && <StepDate newTraining={newTraining} setNewTraining={setNewTraining} today={today} error={error} onValidityChange={setIsDateValid} />}
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

            {showDialog && <Confetti numberOfPieces={500} recycle={false} width={width} height={height} />}

            <TrainingDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                category={newTraining.category}
                trainingDaysCount={trainingDaysCount}
            />

            <AchievementShareDialog
                open={!!achievementToShare}
                achievement={achievementToShare}
                onClose={() => {
                    setAchievementToShare(null);
                    setShowDialog(true);
                }}
            />
        </>
    );
};

export default TrainingPage;
