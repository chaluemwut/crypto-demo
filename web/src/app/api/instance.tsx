import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token != null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;