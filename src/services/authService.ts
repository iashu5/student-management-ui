import api from './api';
import { LoginDto, AuthResponse, ApiResponse } from '../types';

class AuthService {
    async login(credentials: LoginDto): Promise<string> {
        try {
            const response = await api.post<ApiResponse<{ token: string }>>(
                '/api/Auth/login',
                credentials
            );
            
            if (response.data.success && response.data.data.token) {
                const token = response.data.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('user', credentials.username);
                return token;
            }
            throw new Error(response.data.message || 'Login failed');
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Login failed');
        }
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUser(): string | null {
        return localStorage.getItem('user');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        return !!token;
    }
}

export default new AuthService();