import api from "./api";
import { handleError } from "./handleError";

export const getUserDetails = async (userId = null) => {
    const url = userId ? `/User/details/${userId}` : `/User/details`;
    try {
        const response = await api.get(url);

        return response.data;
        
    } catch (error) {
        handleError(error, "Erro ao buscar detalhes do usuário.");
    }
};

export const updateUserDetails = async (userId, userData) => {
    try {
        const response = await api.put(`/User/edit-user/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response.data;

    } catch (error) {
        handleError(error, "Erro ao atualizar detalhes do usuário.");
    }
};