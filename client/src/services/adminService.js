import api from "./api";
import { handleError } from "./handleError";

export const getUsers = async () => {
    try {
        const response = await api.get('/admin/users');

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar usuários.");
    }
};

export const getUserEvaluations = async (userId) => {
    try {
        const response = await api.get(`/admin/user-evaluations/${userId}`);

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar avaliações do usuário.");
    }
}