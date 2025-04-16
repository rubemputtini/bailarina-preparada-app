import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getUserAchievements = async () => {
    try {
        const response = await api.get('/api/v1/achievements/user');
        return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao buscar conquistas do usuário.");
    }
};