import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getPendingFeedbacks = async (page = 1, pageSize = 10, searchTerm = null, category = null) => {
    try {
        const response = await api.get('/api/v1/trainings/feedbacks', {
            params: { page, pageSize, searchTerm, category }
        });

        return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao buscar feedbacks pendentes.");
    }
};

export const markAsResolved = async (feedbackId) => {
    try {
        const response = await api.post(`/api/v1/trainings/feedbacks/${feedbackId}/resolve`);

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao resolver feedback do usuário.");
    }
};

export const replyToFeedback = async (feedbackId, request) => {
    try {
        const response = await api.post(`/api/v1/trainings/feedbacks/${feedbackId}/reply`, request);

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao enviar feedback ao usuário.");
    }
};

export const getMyFeedbacks = async (page = 1, pageSize = 5) => {
    try {
        const response = await api.get('/api/v1/trainings/feedbacks/me', {
            params: { page, pageSize }
        });

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar feedbacks do usuário.");
    }
};

export const acknowledgeFeedback = async (feedbackId) => {
    try {
        const response = await api.post(`/api/v1/trainings/feedbacks/me/${feedbackId}/acknowledge`);

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao marcar feedback do usuário como lido.");
    }
};
