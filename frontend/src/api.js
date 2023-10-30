import axios from "axios";

const baseDomain = import.meta.env.VITE_APP_API_URL;

const baseURL = `${baseDomain}`;
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
