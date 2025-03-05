import api from "./api";
import { handleError } from "./handleError";

const currentDate = new Date();

export const getDailySchedule = async () => {
    try {
        const response = await api.get("/api/v1/Schedule/daily-schedule");

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar treinos do dia.");
        return [];
    }
};

export const getRankingMonthTop5 = async () => {
    try {
        const response = await api.get('/api/v1/Ranking/top5', {
            params: { month: currentDate.getMonth() + 1, year: currentDate.getFullYear() }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar ranking.");
        return [];
    }
};

export const getYearlyTrainingDaysCount = async () => {
    try {
        const response = await api.get("/api/v1/Training/trainings-yearly-days-count", {
            params: { year: currentDate.getFullYear() }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar contador de treinos do ano.");
        return 0;
    }
};
