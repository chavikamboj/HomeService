import axios from "axios";

const api = axios.create({
  baseURL: "https://homeservice-production-8e5b.up.railway.app/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;