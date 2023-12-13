import { defineStore } from 'pinia';
import { User } from '../models/user.model';
import { login, register } from '../services/user.service';

type UserState = {
    user: User | null;
};

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state): boolean => !!state.user,
    },
    actions: {
        async register(username: string, email: string, password: string): Promise<void> {
            const response = await register(username, email, password);
            this.user = response.user;
        },
        async login(email: string, password: string): Promise<void> {
            const response = await login(email, password);
            this.user = response.user;
        },
        logout(): void {
            this.user = null;
        },
    },
});
