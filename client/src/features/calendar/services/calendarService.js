import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const getCalendarSummary = async (startDate, endDate) => {
    try {
        const response = await api.get("/api/v1/calendars/summary", { params: { startDate, endDate }});

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar resumo do calendário.");
    }
};

export const getCalendarYearSummary = async (year) => {
    try {
        const response = await api.get("/api/v1/calendars/year-summary", { params: { year }});

        return response.data;
    } catch (error) {
        throw handleError(error, "Erro ao buscar resumo anual do calendário.");
    }
};