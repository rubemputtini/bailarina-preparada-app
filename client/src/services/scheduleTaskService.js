import api from "./api";
import { handleError } from "./handleError";

export const deleteScheduleTask = async (scheduleTaskId) => {
    try {
        await api.delete(`/api/v1/ScheduleTask/delete-scheduleTask/${scheduleTaskId}`);
    } catch (error) {
        handleError(error, "Erro ao excluir atividade.");
    }
}