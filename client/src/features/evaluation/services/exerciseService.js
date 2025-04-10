import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getExercises = async () => {
    try {
        const response = await api.get('/api/v1/exercises');

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar exercícios.");
    }
}