import api from "./api";

export const getUserSchedule = async (userId) => {
    try {
        const response = await api.get(`/api/v1/Schedule/${userId}`);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar planejamento do usuário: ", error);

        throw error;
    }
};

export const createSchedule = async (payload) => {
    try {
        await api.post("/api/v1/Schedule/create-schedule");

    } catch (error) {
        console.error("Erro ao criar planejamento do usuário: ", error);

        throw error;
    }
};

export const updateSchedule = async (scheduleId, payload) => {
    try {
        await api.put(`/api/v1/Schedule/update-schedule/${scheduleId}`, payload);

    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        throw error;
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        await api.delete(`/api/v1/Schedule/delete-schedule/${scheduleId}`);

    } catch (error) {
        console.error("Erro ao excluir planejamento:", error);
        throw error;
    }
};