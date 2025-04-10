import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getRanking = async (month, year, limit) => {
    try {
        const response = await api.get('/api/v1/ranking', {
            params: { month, year, limit }
        });

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar ranking.");
    }
}