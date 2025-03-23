import api from "./api";
import { handleError } from "./handleError";

export const getExercises = async () => {
    try {
        const response = await api.get('/api/v1/exercises');

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar exercícios.");
    }
}