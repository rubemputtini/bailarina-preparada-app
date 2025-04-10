import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getUsers = async (page = 1, pageSize = 10) => {
    try {
        const response = await api.get(`/api/v1/admin/users?page=${page}&pageSize=${pageSize}`);

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar usuários.");
    }
};

export const getUserEvaluations = async (userId) => {
    try {
        const response = await api.get(`/api/v1/admin/users/${userId}/evaluations`);

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar avaliações do usuário.");
    }
}