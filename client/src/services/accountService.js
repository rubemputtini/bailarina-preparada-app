import { clearToken, setToken} from './auth';
import api from './api';

export const login = async (email, password) => {
    try {
      const response = await api.post('/Account/login', { email, password });

      return response.data;

    } catch (error) {
        const errorMessage = error.response?.data || error.message || "Erro desconhecido.";
        console.error("Erro ao fazer login:", errorMessage);

        throw new Error(errorMessage);
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await api.post('/Account/register', {
          name,
          email,
          password
        });

        const { token, message } = response.data;

        if (token) {
            setToken(token);
        }
        
        return { token, message };

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao registrar usuário";
      const details = error.response?.data?.details || [];

      console.error("Erro ao registrar: ", errorMessage, details);
        
      const customError = new Error(errorMessage);
      customError.details = details;

      throw customError;
    } 
};

export const logout = () => {
    clearToken();

    console.log("Usuário deslogado");
};

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete('/Account/delete-user/', {
          data: { id : userId },
        });
  
        return response.data;

    } catch (error) {
        console.error("Erro ao excluir usuário: ", error.response?.data || error.message);

        throw error;
    }
};