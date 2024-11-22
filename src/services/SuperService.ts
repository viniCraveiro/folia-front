import axios from "axios";
import AuthService from "./AuthServices";

const http = axios.create({
});

http.defaults.baseURL = (location.origin).replace("5173", "8080") + "/api/"; //URL PARA COMINUCACAO COM O A API
// http.defaults.baseURL = (location.origin+'/api/'); //URL PARA COMINUCACAO COM O A API

http.defaults.headers.common['Content-Type'] = 'application/json';
http.defaults.headers.common['Accept'] = 'application/json';

const authService = AuthService.getInstance();

// Request Interceptor to add Authorization Token
http.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for error handling
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    const errorResponse = error.response?.data;
    return Promise.reject(errorResponse ?? error);
  }
);

export default http;
