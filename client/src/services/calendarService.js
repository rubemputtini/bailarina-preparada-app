import api from "./api";
import { handleError } from "./handleError";

export const getCalendarSummary = async (startDate, endDate) => {
    try {
        const response = await api.get("/api/v1/calendars/summary", { params: { startDate, endDate }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar resumo do calendário.");
    }
};