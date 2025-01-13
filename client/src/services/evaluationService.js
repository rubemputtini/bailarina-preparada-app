import api from "./api";

export const getEvaluations = async () => {
    try {
        const response = await api.get('/api/v1/Evaluation');

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar avaliações: ", error);

        throw error;
    }
};

export const getEvaluationById = async (evaluationId) => {
    try {
        const response = await api.get(`/api/v1/Evaluation/${evaluationId}`);

        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar avaliação com ID ${evaluationId}: `, error);

        throw error;
    }
};

export const createEvaluation = async (payload) => {
    
    try {
        await api.post('/api/v1/Evaluation', payload);
    } catch (error) {
        console.error('Erro ao criar avaliação:', error);

        throw error;
    }
};

export const updateEvaluation = async (evaluationId, updatedExercises) => {
    try {
        const response = await api.put(`/api/v1/Evaluation/${evaluationId}`, updatedExercises);

        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar avaliação com ID ${evaluationId}:`, error);

        throw error;
    }
};

export const deleteEvaluation = async (evaluationId) => {
    try {
        await api.delete(`/api/v1/Evaluation/${evaluationId}`);
    } catch (error) {
        console.error(`Erro ao deletar avaliação com ID ${evaluationId}:`, error);

        throw error;
    }
}