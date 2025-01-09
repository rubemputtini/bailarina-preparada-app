import api from "./api";

export const getUsers = async () => {
    try {
        const response = await api.get('/admin/users');

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
        
        throw error;
    }
};

export const getUserEvaluations = async (userId) => {
    try {
        const response = await api.get(`/admin/user-evaluations/${userId}`);

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar avaliações do usuário: ", error);

        throw error;
    }
}