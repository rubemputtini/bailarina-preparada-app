import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getUserAchievements = async (userId) => {
    try {
        const endpoint = userId
        ? `/api/v1/achievements/user/${userId}`
        : `/api/v1/achievements/user`

        const response = await api.get(endpoint);
        return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao buscar conquistas do usuário.");
    }
};