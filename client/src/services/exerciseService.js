import api from "./api";

export const getExercises = async () => {
    try {
        const response = await api.get('/api/v1/Exercise');

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar exercícios: ", error);

        throw error;
    }
}