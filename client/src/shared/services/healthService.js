import axios from "axios";
import { API_URL } from "shared/utils/constants";

export const pingHealthCheck = () => {
    axios.get(`${API_URL}/health`, { timeout: 10000 }).catch(() => {});
};
