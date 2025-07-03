import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { calculateTotalFMSScore } from "../../../shared/utils/fmsUtils";
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
import PageLayout from "layouts/PageLayout";
import PhotosTab from "../components/PhotosTab";
import InfoDialog from "shared/dialogs/InfoDialog";
import useIsAdmin from "hooks/useIsAdmin";
import { ROUTES } from "shared/routes/routes";
import BackButton from "shared/buttons/BackButton";

const EvaluationDetailPage = () => {
    const { evaluationId } = useParams();
    const { evaluation, referenceMap } = useEvaluationDetails(evaluationId);
    const [selectedTab, setSelectedTab] = useState("FMS");
    const [openInfo, setOpenInfo] = useState(false);

    const isAdmin = useIsAdmin();

    const backRoute = useMemo(() => {
        if (!evaluation) return -1;

        return isAdmin
            ? ROUTES.adminUserEvaluations(evaluation.userId)
            : ROUTES.evaluationHistoric;
    }, [evaluation, isAdmin])

    if (!evaluation) {
        return (
            <PageLayout>
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
            </PageLayout>
        );
    }

    const grouped = groupByCategory(evaluation.exercises);
    const totalFMSScore = calculateTotalFMSScore(grouped.fms);
    const avgClassification = calculateAvgClassification(grouped.physical, referenceMap);
    const nextEvaluationDate = dayjs(evaluation.date).add(6, "month").format("DD/MM/YYYY");

    return (
        <PageLayout>
            <BackButton to={backRoute} />
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

                    <p className="text-md text-white text-center mb-6">
                        <button
                            onClick={() => setOpenInfo(true)}
                            className="underline decoration-white/40 hover:decoration-white transition-all"
                        >
                            Como essa classificação é calculada?
                        </button>
                    </p>

                    <EvaluationGrid
                        items={groupUnilateralExercises(grouped.physical, referenceMap)}
                        userAge={evaluation.userAge}
                        userGender={evaluation.userGender}
                    />
                </>
            )}

            {selectedTab === "FOTOS" && (
                <PhotosTab evaluationId={evaluationId} photosUrl={evaluation.photosUrl} />
            )}

            <InfoDialog open={openInfo} onClose={() => setOpenInfo(false)} />
        </PageLayout>
    );
};

export default EvaluationDetailPage;