import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getAllReferences = async () => {
    try {
        const response = await api.get('/api/v1/exercise-references');

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar todas os valores de referências dos exercícios.");
    }
};

export const getByExerciseId = async (exerciseId) => {
    try {
        const response = await api.get(`/api/v1/exercise-references/${exerciseId}`);

        return response.data;
    } catch (error) {
        handleError(error, `Erro ao buscar os valores de referências do exercício com ID ${exerciseId}.`);
    }
};

export const getClassificationForUser = async (exerciseId, age, gender, score) => {
    try {
        const response = await api.get("/api/v1/exercise-references/user", { params: { exerciseId, age, gender, score }});

        return response.data;
    } catch (error) {
        handleError(error, `Erro ao buscar os valores de referências do exercício com ID ${exerciseId} para ${age} anos e sexo ${gender}.`);
    }
};