const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const api = {
    // Auth
    login: async (email, password) => {
        const res = await fetch(`${BASE_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Login failed');
        }
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },

    register: async (userData) => {
        const res = await fetch(`${BASE_URL}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', ...userData })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || 'Registration failed');
        }
        const newUser = await res.json();
        localStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Careers
    getCareers: async (category = 'All', searchQuery = '') => {
        const params = new URLSearchParams();
        if (category !== 'All') params.append('category', category);
        if (searchQuery) params.append('search', searchQuery);
        
        const res = await fetch(`${BASE_URL}/careers?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch careers');
        return await res.json();
    },

    getRecommendedCareers: async (interests = []) => {
        // Just fetch all and slice for simplicity
        const res = await fetch(`${BASE_URL}/careers`);
        const all = await res.json();
        if (!interests || interests.length === 0) return all.slice(0, 3);
        return all.filter(c => interests.includes(c.category)).slice(0, 3);
    },

    addCareer: async (career) => {
        const res = await fetch(`${BASE_URL}/careers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(career)
        });
        if (!res.ok) throw new Error('Failed to add career');
        return await res.json();
    },

    deleteCareer: async (id) => {
        const res = await fetch(`${BASE_URL}/careers?id=${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete career');
        return true;
    },

    // Counselors
    getCounselors: async () => {
        const res = await fetch(`${BASE_URL}/counselors`);
        if (!res.ok) throw new Error('Failed to fetch counselors');
        return await res.json();
    },

    // Sessions
    getSessionsByUser: async (userId) => {
        const res = await fetch(`${BASE_URL}/sessions?userId=${userId}`);
        if (!res.ok) throw new Error('Failed to fetch sessions');
        return await res.json();
    },

    getAllSessions: async () => {
        const res = await fetch(`${BASE_URL}/sessions`);
        if (!res.ok) throw new Error('Failed to fetch all sessions');
        return await res.json();
    },

    bookSession: async (sessionData) => {
        const res = await fetch(`${BASE_URL}/sessions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sessionData)
        });
        if (!res.ok) throw new Error('Failed to book session');
        return await res.json();
    },

    // Dashboard Stats (Admin)
    getAdminStats: async () => {
        const res = await fetch(`${BASE_URL}/admin-stats`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        return await res.json();
    }
};
