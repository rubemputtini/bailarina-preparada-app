import { useState } from "react";
import { useParams } from "react-router-dom";
import { calculateTotalFMSScore } from "../utils/fmsUtils";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FMSScoreCard from "../components/evaluation/FMSScoreCard";
import PhysicalScoreCard from "../components/evaluation/PhysicalScoreCard";
import EvaluationSummary from "../components/evaluation/EvaluationSummary";
import EvaluationTabs from "../components/evaluation/EvaluationTabs";
import EvaluationGrid from "../components/evaluation/EvaluationGrid";
import { groupUnilateralExercises } from "../utils/exerciseUtils";
import { calculateAvgClassification } from "../utils/classificationUtils";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import useEvaluationDetails from "../hooks/useEvaluationDetails";
import { groupByCategory } from "../utils/exerciseUtils";
import LoadingCard from "../components/cards/LoadingCard";

const EvaluationDetailPage = () => {
    const { evaluationId } = useParams();
    const { evaluation, referenceMap } = useEvaluationDetails(evaluationId);
    const [selectedTab, setSelectedTab] = useState("FMS");

    if (!evaluation) {
        return (
            <div className="flex flex-col min-h-screen">
                <Nav />
                <div className="max-w-7xl mx-auto p-6 flex-grow">
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "800",
                            textAlign: "center",
                            background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            marginBottom: "24px",
                            fontSize: { xs: "2rem", md: "2.5rem" },
                        }}
                    >
                        Resultado da Avaliação Física
                    </Typography>

                    <LoadingCard />
                </div>
                <Footer />
            </div>
        );
    }

    const grouped = groupByCategory(evaluation.exercises);
    const totalFMSScore = calculateTotalFMSScore(grouped.fms);
    const avgClassification = calculateAvgClassification(grouped.physical, referenceMap);
    const nextEvaluationDate = dayjs(evaluation.date).add(6, "month").format("DD/MM/YYYY");

    return (
        <div className="min-h-screen text-white">
            <Nav />
            <div className="max-w-7xl mx-auto p-6">
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "800",
                        textAlign: "center",
                        background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "24px",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                    }}
                >
                    Resultado da Avaliação Física
                </Typography>

                <EvaluationSummary
                    name={evaluation.userName}
                    date={evaluation.date}
                    nextDate={nextEvaluationDate}
                />

                <EvaluationTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

                {selectedTab === "FMS" && (
                    <>
                        <FMSScoreCard totalFMSScore={totalFMSScore} />
                        <EvaluationGrid items={groupUnilateralExercises(grouped.fms, referenceMap)} />
                    </>
                )}

                {selectedTab === "CAPACIDADES" && (
                    <>
                        <PhysicalScoreCard averageClassification={avgClassification} />
                        <EvaluationGrid items={groupUnilateralExercises(grouped.physical, referenceMap)} />
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default EvaluationDetailPage;