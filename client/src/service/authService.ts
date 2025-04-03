import $api from "../http";
import { AuthResponse } from "../models/response/authResponse";

export default class AuthService {
    static async login(user: string, password: string) {
        try {
            const response = await $api.post<AuthResponse>('/login', { user, password });
            console.log(response)
            console.log(response.data.accessToken)
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            console.log(localStorage.getItem('token'))
            return response
        } catch (error) {
            console.error('Ошибка при входе:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }

    static async registration(username: string, email: string, password: string) {
        try {
            const response = await $api.post<AuthResponse>('/registration', { username, email, password });
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken) 
            return response;
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
    static async logout() {
        try {
            const token = localStorage.getItem('refreshToken')
            await $api.post('/logout', {token});
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            throw error;
        }
    }
}