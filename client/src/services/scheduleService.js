import api from "./api";
import { handleError } from "./handleError";

export const getUserSchedule = async (userId) => {
    try {
        const response = await api.get(`/api/v1/Schedule/${userId}`);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar planejamento do usuário.");
    }
};

export const createSchedule = async (payload) => {
    try {
        await api.post("/api/v1/Schedule/create-schedule");

    } catch (error) {
        handleError(error, "Erro ao criar planejamento do usuário.");
    }
};

export const updateSchedule = async (scheduleId, payload) => {
    try {
        await api.put(`/api/v1/Schedule/update-schedule/${scheduleId}`, payload);

    } catch (error) {
        handleError(error, "Erro ao atualizar planejamento do usuário.");
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        await api.delete(`/api/v1/Schedule/delete-schedule/${scheduleId}`);

    } catch (error) {
        handleError(error, "Erro ao excluir planejamento do usuário.");
    }
};