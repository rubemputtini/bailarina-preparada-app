import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvaluationById } from "features/evaluation/services/evaluationService";
import { getUserDetails } from "../shared/services/userService";
import { getClassificationForUser } from "features/evaluation/services/exerciseReferenceService";
import { calculateAge } from "../shared/utils/dateUtils";

const useEvaluationDetails = (evaluationId) => {
    const [evaluation, setEvaluation] = useState(null);
    const [referenceMap, setReferenceMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const loadEvaluation = async () => {
            try {
                const evaluationData = await getEvaluationById(evaluationId);
                const user = await getUserDetails(evaluationData.userId);
                const age = calculateAge(user.dateOfBirth);
                const gender = evaluationData.userGender;

                const referenceRequests = evaluationData.exercises.map(async (e) => {
                    const sideKey = e.side === 1 ? "R" : e.side === 2 ? "L" : "U";

                    try {
                        const reference = await getClassificationForUser(
                            e.exercise.exerciseId, age, gender, e.score
                        );

                        return { id: `${e.exercise.exerciseId}-${sideKey}`, reference };
                    } catch {
                        return { id: `${e.exercise.exerciseId}-${sideKey}`, reference: null };
                    }
                });

                const results = await Promise.all(referenceRequests);
                const map = {};
                
                results.forEach(({ id, reference }) => {
                    map[id] = reference;
                });

                setEvaluation(evaluationData);
                setReferenceMap(map);
            } catch (error) {
                if (error.status === 403) navigate("/dashboard");
                else console.error("Erro ao carregar avaliação:", error.message);
            }
        };

        loadEvaluation();
    }, [evaluationId, navigate]);

    return { evaluation, referenceMap };
};

export default useEvaluationDetails;