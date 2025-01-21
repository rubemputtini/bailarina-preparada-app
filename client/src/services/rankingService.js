import api from "./api";

export const getRanking = async (month, year) => {
    try {
        const response = await api.get('/api/v1/Ranking', {
            params: { month, year }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar ranking: ", error);

        throw error;
    }
}