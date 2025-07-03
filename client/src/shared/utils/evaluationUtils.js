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

    const referenceRequests = evaluationData.exercises.map(async (exerciseEntry) => {
      const { exercise, score, side } = exerciseEntry;
      const sideKey = side === 1 ? "R" : side === 2 ? "L" : "U";
      const id = `${exercise.exerciseId}-${sideKey}`;

      if (exercise.category === "FMS") {
        return { id, reference: null };
      }

      try {
        const reference = await getClassificationForUser(exercise.exerciseId, age, gender, score);

        return { id, reference };
      } catch {
        return { id, reference: null };
      }
    });

    const results = await Promise.all(referenceRequests);
    const referenceMap = results.reduce((map, {id, reference }) => {
      map[id] = reference;
      return map;
    }, {});

    return {
      evaluation: {
        ...evaluationData,
        userAge: age,
      },
      referenceMap,
    };

  } catch (error) {
      console.error("Erro ao carregar avaliação:", error.message);
      throw error;
    }
  };