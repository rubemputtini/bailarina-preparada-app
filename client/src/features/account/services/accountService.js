import { clearToken } from '../../auth/services/auth';
import api from 'shared/services/api';
import { handleError } from 'shared/services/handleError';

export const login = async (email, password) => {
    try {
      const response = await api.post('/api/v1/account/login', { email, password });

      return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao fazer login.");
    }
};

export const register = async (formData) => {
    try {
        const response = await api.post('/api/v1/account/register', {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            postalCode: formData.postalCode,
            dateOfBirth: formData.dateOfBirth,
            latitude: formData.latitude,
            longitude: formData.longitude
        });

        const { token, message } = response.data;
      
        return { token, message };

    } catch (error) {
        throw handleError(error, "Erro ao registrar usuário.");
    } 
};

export const logout = () => {
    clearToken();
    delete api.defaults.headers.common.Authorization;
    console.log("Usuário deslogado");
};

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete('/api/v1/account/user', {
          data: { id : userId },
        });
  
        return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao excluir usuário.");
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/api/v1/account/forgot-password', { email });

        return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao solicitar redefinição de senha.");
    }
};

export const resetPassword = async ({ email, token, newPassword }) => {
    try {
        const response = await api.post('/api/v1/account/reset-password', { email, token, newPassword });

        return response.data;

    } catch (error) {
        throw handleError(error, "Erro ao redefinir nova senha.");
    }
};
