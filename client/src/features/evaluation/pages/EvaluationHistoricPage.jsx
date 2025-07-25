import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserEvaluations } from "features/admin/services/adminService";
import { getMyEvaluations } from "../services/evaluationService";
import PageLayout from "layouts/PageLayout";
import LoadingCard from "shared/ui/LoadingCard";
import EvaluationCard from "../components/EvaluationCard";
import { Typography } from "@mui/material";
import { calculateAvgClassification } from "shared/utils/classificationUtils";
import { calculateTotalFMSScore } from "shared/utils/fmsUtils";
import { groupByCategory } from "shared/utils/exerciseUtils";
import { fetchEvaluationDetails } from "shared/utils/evaluationUtils";
import { getUserId } from "features/auth/services/auth";
import ErrorCard from "shared/ui/ErrorCard";
import BackButton from "shared/buttons/BackButton";
import { ROUTES } from "shared/routes/routes";
import PageTitle from "layouts/PageTitle";

const EvaluationHistoricPage = () => {
    const params = useParams();
    const isAdminView = !!params.userId;
    const userId = isAdminView ? params.userId : getUserId();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [evaluations, setEvaluations] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const fetchAllEvaluations = async () => {
            try {
                const rawEvaluations = isAdminView
                    ? await getUserEvaluations(userId)
                    : await getMyEvaluations();

                if (isAdminView && rawEvaluations.length > 0) {
                    setUserName(rawEvaluations[0].userName);
                }

                const detailed = await Promise.all(
                    rawEvaluations.map(async (preview) => {
                        const { evaluation, referenceMap } = await fetchEvaluationDetails(preview.evaluationId);
                        if (!evaluation) return null;

                        const grouped = groupByCategory(evaluation.exercises);
                        const fmsScore = calculateTotalFMSScore(grouped.fms);
                        const classification = calculateAvgClassification(grouped.physical, referenceMap);

                        return {
                            ...evaluation,
                            fmsScore,
                            physicalClassification: classification,
                        };
                    })
                );

                setEvaluations(detailed.filter(Boolean));
            } catch (error) {
                setError("Não existem avaliações registradas para o usuário.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllEvaluations();
    }, [userId, isAdminView]);

    return (
        <PageLayout>
            <div className="text-center">

                {isAdminView && <BackButton to={ROUTES.adminHome} />}

                <PageTitle>
                    Histórico de Avaliações
                </PageTitle>

                {isAdminView && userName && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#9575cd',
                            fontSize: { xs: '20px', sm: '22px' },
                            fontWeight: 500,
                            marginTop: "0.5em"
                        }}
                    >
                        {userName}
                    </Typography>
                )}

                {loading ? (
                    <LoadingCard />
                ) : error ? (
                    <ErrorCard message={error} />
                ) : evaluations.length === 0 ? (
                    <Typography
                        className="text-center text-gray-500" sx={{ marginTop: 6 }}>Nenhuma avaliação encontrada.
                    </Typography>
                ) : (
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {evaluations
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((evaluation) => (
                                <EvaluationCard
                                    key={evaluation.evaluationId}
                                    evaluation={evaluation}
                                    fmsScore={evaluation.fmsScore}
                                    classification={evaluation.physicalClassification}
                                />
                            ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default EvaluationHistoricPage;
