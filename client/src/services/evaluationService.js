import api from "./api";
import { handleError } from "./handleError";

export const getEvaluations = async () => {
    try {
        const response = await api.get('/api/v1/Evaluation');

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar avaliações.");
    }
};

export const getEvaluationById = async (evaluationId) => {
    try {
        const response = await api.get(`/api/v1/Evaluation/${evaluationId}`);

        return response.data;
    } catch (error) {
        handleError(error, `Erro ao buscar avaliação com ID ${evaluationId}.`);
    }
};

export const createEvaluation = async (payload) => {    
    try {
        await api.post('/api/v1/Evaluation', payload);
    } catch (error) {
        handleError(error, "Erro ao criar avaliação.");
    }
};

export const updateEvaluation = async (evaluationId, updatedExercises) => {
    try {
        const response = await api.put(`/api/v1/Evaluation/${evaluationId}`, updatedExercises);

        return response.data;
    } catch (error) {
        handleError(error, `Erro ao atualizar avaliação com ID ${evaluationId}.`);
    }
};

export const deleteEvaluation = async (evaluationId) => {
    try {
        await api.delete(`/api/v1/Evaluation/${evaluationId}`);
    } catch (error) {
        handleError(error, `Erro ao apagar avaliação com ID ${evaluationId}.`);
    }
}