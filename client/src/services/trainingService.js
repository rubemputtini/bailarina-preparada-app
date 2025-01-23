import api from "./api";

export const createTraining = async (date, category, description) => {
    try {
        await api.post('/api/v1/Training/create-training', {
            date,
            category,
            description
        });

    } catch (error) {
        console.error("Erro ao criar treino: ", error);

        throw error;
    }
};

export const getTrainingsByUser = async (startDate, endDate, category) => {
    try {
        const response = await api.get('/api/v1/Training/completed-trainings');

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar treinos do usuário: ", error);

        throw error; 
    }
};

export const deleteTraining = async (trainingId) => {
    try {
        await api.delete(`/api/v1/Training/delete-training/${trainingId}`)
    } catch (error) {
        console.error("Erro ao excluir treino: ", error);

        throw error; 
    }
};