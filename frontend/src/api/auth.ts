// src/types/auth.ts
export interface User {
    id: number;
    email: string;
    username: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
    confirmPassword?: string;
}