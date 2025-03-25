import api from "./api";
import { handleError } from "./handleError";

export const getMyGoals = async () => {
    try {
        const response = await api.get("api/v1/user-goals/me");

        return response.data;
        
    } catch (error) {
        handleError(error, "Erro ao buscar metas do usuário.");
    }
};

export const getMyGoalByYear = async (year) => {
    try {
        const response = await api.get(`api/v1/user-goals/me/${year}`);

        return response.data;
        
    } catch (error) {
        handleError(error, "Erro ao buscar metas por ano do usuário.");
    }
};

export const setMyGoal = async (goal) => {
    try {
        const response = await api.put("api/v1/user-goals/me", goal);

        return response.data;
        
    } catch (error) {
        handleError(error, "Erro ao definir meta do usuário.");
    }
};