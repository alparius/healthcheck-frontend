import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        post: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        }
    }
});

axiosInstance.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem('token')).userToken;
    if (token != null) {
        config.headers.AUTHORIZATION = token;
    }
    
    return config;
}, function (err) {
    return Promise.reject(err);
});

export default axiosInstance;
