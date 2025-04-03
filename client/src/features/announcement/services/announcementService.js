import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getAnnouncements = async () => {
    try {
        const response = await api.get("/api/v1/announcements");

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar avisos visíveis.");
        return [];
    }
};

export const getAllAnnouncements = async () => {
    try {
        const response = await api.get("/api/v1/announcements/all");

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar todos os avisos.");
        return [];
    }
};

export const createAnnouncement = async (payload) => {
    try {
        const response = await api.post("/api/v1/announcements", payload);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao criar aviso.");
    }
};

export const toggleVisibility = async (announcementId, isVisible) => {
    try {
        const response = await api.patch(`/api/v1/announcements/${announcementId}/visibility?isVisible=${isVisible}`);

        return response.data.message;
    } catch (error) {
        handleError(error, "Erro ao alterar visibilidade do aviso.");
    }
};

export const deleteAnnouncement = async (announcementId) => {
    try {
        const response = await api.delete(`/api/v1/announcements/${announcementId}`);

        return response.data.message;
    } catch (error) {
        handleError(error, "Erro ao excluir aviso.");
    }
};
