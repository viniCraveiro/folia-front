import axios from "axios";

const axiosClient = axios.create({
});

axiosClient.defaults.baseURL = "http://localhost:8080/api/" //URL PARA COMINUCACAO COM O A API

axiosClient.defaults.headers.common['Content-Type'] = 'application/json';
axiosClient.defaults.headers.common['Accept'] = 'application/json';

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Token de Login salvo no "authToken"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use( // Tratamento de Erros Padrão
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      // window.location.href = "/login"; //Melhorar Tratamento futuro
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
