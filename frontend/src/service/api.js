import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "./cookie";

const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use((config) => {
  const token = getToken();
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
