import api from "./api";

export const getUserDetails = async (userId = null) => {
    const url = userId ? `/User/details/${userId}` : `/User/details`;
    try {
        const response = await api.get(url);

        return response.data;
        
    } catch (error) {
        console.error("Erro ao buscar detalhes do usuário: ", error.response?.data || error.message);

        throw error;
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
        console.error("Erro ao atualizar detalhes do usuário: ", error.response?.data || error.message);

        throw error;
    }
};