import axios from "axios";

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_CORS_ORIGINS });

export default axiosInstance;
