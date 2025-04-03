import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getUserSchedule = async (userId) => {
    try {
        const response = await api.get(`/api/v1/schedules/${userId}`);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar planejamento do usuário.");
    }
};

export const getMySchedule = async () => {
    try {
        const response = await api.get(`/api/v1/schedules/me`);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar seu planejamento.");
    }
};

export const createSchedule = async (payload) => {
    try {
        const response = await api.post("/api/v1/schedules", payload);

        return response.data.schedule;
    } catch (error) {
        handleError(error, "Erro ao criar planejamento do usuário.");
    }
};

export const updateSchedule = async (scheduleId, payload) => {
    try {
        await api.put(`/api/v1/schedules/${scheduleId}`, payload);

    } catch (error) {
        handleError(error, "Erro ao atualizar planejamento do usuário.");
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        await api.delete(`/api/v1/schedules/${scheduleId}`);

    } catch (error) {
        handleError(error, "Erro ao excluir planejamento do usuário.");
    }
};