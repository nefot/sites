import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginData, RegisterData } from '../types/auth';
import { authAPI } from '../services/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    isLoading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Инициализация при монтировании
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const userData = await authAPI.getProfile(storedToken);
                    setUser(userData);
                    setToken(storedToken);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    localStorage.removeItem('token');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (loginData: LoginData) => {
        setLoading(true);
        try {
            const { access_token, user: userData } = await authAPI.login(loginData);
            localStorage.setItem('token', access_token);
            setToken(access_token);
            setUser(userData);
        } catch (error: unknown) {
            console.error('Login failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Login failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const register = async (registerData: RegisterData) => {
        setLoading(true);
        try {
            const { access_token, user: userData } = await authAPI.register(registerData);
            localStorage.setItem('token', access_token);
            setToken(access_token);
            setUser(userData);
        } catch (error: unknown) {
            console.error('Registration failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            throw new Error(`Registration failed: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isLoading,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};