import api from "shared/services/api";
import { handleError } from "shared/services/handleError";

export const deleteScheduleTask = async (scheduleTaskId) => {
    try {
        await api.delete(`/api/v1/schedule-tasks/${scheduleTaskId}`);
    } catch (error) {
        throw handleError(error, "Erro ao excluir atividade.");
    }
}