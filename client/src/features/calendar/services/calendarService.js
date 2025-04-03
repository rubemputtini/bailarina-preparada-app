import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getCalendarSummary = async (startDate, endDate) => {
    try {
        const response = await api.get("/api/v1/calendars/summary", { params: { startDate, endDate }
        });

        return response.data;
    } catch (error) {
        handleError(error, "Erro ao buscar resumo do calendário.");
    }
};