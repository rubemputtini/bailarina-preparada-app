import { clearToken, setToken} from './auth';
import api from './api';
import { handleError } from './handleError';

export const login = async (email, password) => {
    try {
      const response = await api.post('/Account/login', { email, password });

      return response.data;

    } catch (error) {
        handleError(error, "Erro ao fazer login.");
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
        handleError(error, "Erro ao registrar usuário.");
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
        handleError(error, "Erro ao excluir usuário.");
    }
};