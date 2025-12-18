// src/services/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const authAPI = {
    login: async (data: { email: string; password: string }) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Login failed: ${response.status}`);
            }

            return response.json();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
                throw new Error('Network error: не удалось связаться с сервером. Проверьте, запущен ли бэкенд и разрешён ли CORS.');
            }
            throw new Error(msg);
        }
    },

    register: async (data: { email: string; username: string; password: string }) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Registration failed: ${response.status}`);
            }

            return response.json();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
                throw new Error('Network error: не удалось связаться с сервером. Проверьте, запущен ли бэкенд и разрешён ли CORS.');
            }
            throw new Error(msg);
        }
    },

    getProfile: async (token: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            return response.json();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
                throw new Error('Network error: не удалось связаться с сервером. Проверьте, запущен ли бэкенд и разрешён ли CORS.');
            }
            throw new Error(msg);
        }
    },

    // New: get news list (public)
    getNews: async () => {
        try {
            const response = await fetch(`${API_URL}/news`);
            if (!response.ok) {
                throw new Error(`Failed to load news: ${response.status}`);
            }
            return response.json();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('Failed to fetch')) {
                throw new Error('Network error: не удалось загрузить новости.');
            }
            throw new Error(msg);
        }
    },

    // New: add news (protected)
    addNews: async (data: { title: string; description: string; imageUrl?: string; tags?: string[] }, token: string) => {
        try {
            const response = await fetch(`${API_URL}/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Failed to add news: ${response.status}`);
            }
            return response.json();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes('Failed to fetch')) {
                throw new Error('Network error: не удалось отправить новость.');
            }
            throw new Error(msg);
        }
    }
};