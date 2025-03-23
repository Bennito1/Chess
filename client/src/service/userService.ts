import $api from "../http";
import { IUser } from "../models/user";

export default class UserService {
    static async fetchUsers() {
        try {
            const response = await $api.get<IUser []>('/users'); // Получаем пользователей
            return response.data; // Возвращаем данные пользователей
        } catch (error) {
            console.error('Ошибка при получении пользователей:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
}