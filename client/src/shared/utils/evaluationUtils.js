import { getEvaluationById } from "features/evaluation/services/evaluationService";
import { getUserDetails } from "shared/services/userService";
import { getClassificationForUser } from "features/evaluation/services/exerciseReferenceService";
import { calculateAge } from "shared/utils/dateUtils";

export const fetchEvaluationDetails = async (evaluationId) => {
  
    try {
    const evaluationData = await getEvaluationById(evaluationId);
    const user = await getUserDetails(evaluationData.userId);
    const age = calculateAge(user.dateOfBirth);
    const gender = evaluationData.userGender;

    const referenceRequests = evaluationData.exercises.map(async (e) => {
      const sideKey = e.side === 1 ? "R" : e.side === 2 ? "L" : "U";

      try {
        const reference = await getClassificationForUser(e.exercise.exerciseId, age, gender, e.score);

        return { id: `${e.exercise.exerciseId}-${sideKey}`, reference };
      } catch {
        return { id: `${e.exercise.exerciseId}-${sideKey}`, reference: null };
      }
    });

    const results = await Promise.all(referenceRequests);
    const referenceMap = {};

    results.forEach(({ id, reference }) => {
      referenceMap[id] = reference;
    });

    return {
      evaluation: {
        ...evaluationData,
        userAge: age,
      },
      referenceMap,
    };

  } catch (error) {
      console.error("Erro ao carregar avaliação:", error.message);
    }
  };