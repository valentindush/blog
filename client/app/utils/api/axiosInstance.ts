import axios from 'axios';
import Router from 'next/router';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token')

            Router.push('/auth/login')
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
