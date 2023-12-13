import axios, { AxiosResponse } from 'axios';
import { User } from '../models/user.model';

const USER_API_URL = 'http://localhost:3000/api';

type UserResponse = {
    user: User;
    token: string;
};

export const register = async (username: string, email: string, password: string): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await axios.post(`${USER_API_URL}/register`, {
        username,
        email,
        password,
    });

    return response.data;
};

export const login = async (email: string, password: string): Promise<UserResponse> => {
    const response: AxiosResponse<UserResponse> = await axios.post(`${USER_API_URL}/login`, { email, password });

    return response.data;
};
