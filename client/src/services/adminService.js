import api from "./api";
import { handleError } from "./handleError";

export const getUsers = async (page, pageSize) => {
    try {
        const response = await api.get(`/api/v1/admin/users?page=${page}&pageSize=${pageSize}`);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar usuários.");
    }
};

export const getUserEvaluations = async (userId) => {
    try {
        const response = await api.get(`/api/v1/admin/users/${userId}/evaluations`);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar avaliações do usuário.");
    }
}