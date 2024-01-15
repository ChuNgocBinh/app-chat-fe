import axios from "axios";
import { emitter } from "../App";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (error.response.status === 401){
        emitter.emit('unauthorized')
    }
    return Promise.reject(error);
});


export default axios