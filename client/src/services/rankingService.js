import api from "./api";
import { handleError } from "./handleError";

export const getRanking = async (month, year) => {
    try {
        const response = await api.get('/api/v1/Ranking', {
            params: { month, year }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar ranking.");
    }
}