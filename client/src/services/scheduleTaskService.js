import api from "./api";

export const deleteScheduleTask = async (scheduleTaskId) => {
    try {
        await api.delete(`/api/v1/ScheduleTask/delete-scheduleTask/${scheduleTaskId}`);
    } catch (error) {
        console.error("Erro ao excluir atividade:", error);
        throw error;
    }
}