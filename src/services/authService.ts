import api from './api';

interface AuthResponse {
    token: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { username, password });
    return response.data;
};

export const register = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { username, password });
    return response.data;
};
