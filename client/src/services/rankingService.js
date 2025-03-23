import api from "./api";
import { handleError } from "./handleError";

export const getRanking = async (month, year, limit) => {
    try {
        const response = await api.get('/api/v1/ranking', {
            params: { month, year, limit }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar ranking.");
    }
}