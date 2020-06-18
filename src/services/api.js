import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (process.env.NODE_ENV === "production") {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers["x-endpoint-api-userinfo"] = `${token}`;
    }
  }
  return config;
});

export default api;
