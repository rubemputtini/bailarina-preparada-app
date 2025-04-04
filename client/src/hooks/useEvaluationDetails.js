import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvaluationDetails } from "shared/utils/evaluationUtils";

const useEvaluationDetails = (evaluationId) => {
    const [evaluation, setEvaluation] = useState(null);
    const [referenceMap, setReferenceMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const { evaluation, referenceMap } = await fetchEvaluationDetails(evaluationId);
    
                setEvaluation(evaluation);
                setReferenceMap(referenceMap);
            } catch (error) {
                if (error.status === 403) {
                    navigate("/dashboard");
                  } else {
                    console.error("Erro ao carregar avaliação:", error.message);
                  }
            }
        };

        load();
    }, [evaluationId, navigate]);

    return { evaluation, referenceMap };
};

export default useEvaluationDetails;