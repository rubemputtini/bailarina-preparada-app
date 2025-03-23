import api from "./api";
import { handleError } from "./handleError";

export const createTraining = async (date, category, description) => {
    try {
        await api.post('/api/v1/trainings', {
            date,
            category,
            description
        });

    } catch (error) {
        handleError(error, "Erro ao criar treino.");
    }
};

export const getTrainingsByUser = async (startDate, endDate, category) => {
    try {
        const response = await api.get('/api/v1/trainings/completed', {
            params: {
                startDate: startDate || null,
                endDate: endDate || null,
                category: category || null
            }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar treinos do usuário.");
    }
};

export const deleteTraining = async (trainingId) => {
    try {
        await api.delete(`/api/v1/trainings/${trainingId}`)
    } catch (error) {
        handleError(error, "Erro ao excluir treino.");
    }
};