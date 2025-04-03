import { useState } from "react";
import { useParams } from "react-router-dom";
import { calculateTotalFMSScore } from "../../../shared/utils/fmsUtils";
import Nav from "../../../layouts/Nav";
import Footer from "../../../layouts/Footer";
import FMSScoreCard from "../components/FMSScoreCard";
import PhysicalScoreCard from "../components/PhysicalScoreCard";
import EvaluationSummary from "../components/EvaluationSummary";
import EvaluationTabs from "../components/EvaluationTabs";
import EvaluationGrid from "../components/EvaluationGrid";
import { groupUnilateralExercises } from "../../../shared/utils/exerciseUtils";
import { calculateAvgClassification } from "../../../shared/utils/classificationUtils";
import { Typography } from "@mui/material";
import dayjs from "dayjs";
import useEvaluationDetails from "../../../hooks/useEvaluationDetails";
import { groupByCategory } from "../../../shared/utils/exerciseUtils";
import LoadingCard from "shared/ui/LoadingCard";

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