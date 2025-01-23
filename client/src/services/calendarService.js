import api from "./api";

export const getCalendarSummary = async (startDate, endDate) => {
    try {
        const response = await api.get("/api/v1/Calendar/calendar-summary/", { params: { startDate, endDate }
        });

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar resumo do calendário: ", error);

        throw error;
    }
};