import axios from "axios";
import { API_URL } from "../utils/constants";
import { getToken, clearToken } from "./auth";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || "Erro desconhecido.";

        if (status === 401) {
            clearToken();
            return Promise.reject({ status, message: errorMessage });
        }

        if (status === 403) {
            return Promise.reject({ status, message: errorMessage });
        }

        console.error(`Erro (${status}): ${errorMessage}`);

        return Promise.reject({ status: status || 500, message: errorMessage });
    }
);

export default api;