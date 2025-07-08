import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const createTraining = async (date, category, description) => {
    try {
        await api.post('/api/v1/trainings', {
            date,
            category,
            description
        });

    } catch (error) {
        throw handleError(error, "Erro ao criar treino.");
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
        throw handleError(error, "Erro ao buscar treinos do usuário.");
    }
};

export const getTrainingsByDate = async (date) => {
    try {
        const response = await api.get('/api/v1/trainings/by-date', {
            params: { date }
        });

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar treinos do dia do usuário.");
    }
};

export const deleteTraining = async (trainingId) => {
    try {
        await api.delete(`/api/v1/trainings/${trainingId}`)
    } catch (error) {
        throw handleError(error, "Erro ao excluir treino.");
    }
};