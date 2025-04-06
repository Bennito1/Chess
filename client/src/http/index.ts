import axios from "axios";
import {AuthResponse} from "../models/response/authResponse"
axios.defaults.withCredentials = true
export const API_URL = 'http://25.7.15.253:500/api';


const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

// Добавление интерсептора для запросов
$api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken')
    if (config.headers && accessToken && refreshToken) {
        config.headers.Authorization = `Bearer ${accessToken} ${refreshToken}`; // Установка токена в заголовок
    }
    return config;
});

// Добавление интерсептора для ответов
$api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    // Проверка на 401 ошибку (неавторизован)
    if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true; // Установка флага повторной попытки
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true })
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.error('Ошибка при обновлении токена:', e);
            localStorage.removeItem('token'); // Удаление токена при ошибке
        }
    }
    throw error; // Пробрасываем ошибку дальше
});

export default $api;