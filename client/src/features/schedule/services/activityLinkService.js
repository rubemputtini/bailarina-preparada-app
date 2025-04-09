import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getActivityLinks = async () => {
    try {
        const response = await api.get("/api/v1/activity-links");

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar treinos sugeridos.");
    }
};

export const createActivityLink = async (payload) => {
    try {
        const response = await api.post("/api/v1/activity-links", payload);

        return response.data.schedule;
    } catch (error) {
        handleError(error, "Erro ao criar treino sugerido.");
    }
};

export const updateActivityLink = async (activityLinkId, payload) => {
    try {
        await api.put(`/api/v1/activity-links/${activityLinkId}`, payload);

    } catch (error) {
        handleError(error, "Erro ao atualizar treino sugerido.");
    }
};

export const deleteActivityLink = async (activityLinkId) => {
    try {
        await api.delete(`/api/v1/activity-links/${activityLinkId}`);

    } catch (error) {
        handleError(error, "Erro ao excluir treino sugerido.");
    }
};

export const toggleStatusActivityLink = async (activityLinkId) => {
    try {
        const response = await api.post(`/api/v1/activity-links/${activityLinkId}/toggle`, activityLinkId);

        return response.data.schedule;
    } catch (error) {
        handleError(error, "Erro ao alterar o status do treino sugerido.");
    }
};