import { careers, counselors, mockUsers, mockSessions } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    // Auth
    login: async (email, password) => {
        await delay(500);
        const user = mockUsers.find(u => u.email === email);
        if (!user || password !== 'password123') { // Simple mock auth
            throw new Error('Invalid email or password. Use password123');
        }
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },

    register: async (userData) => {
        await delay(500);
        if (mockUsers.some(u => u.email === userData.email)) {
            throw new Error('Email already exists');
        }
        const newUser = {
            id: `u${mockUsers.length + 1}`,
            role: userData.role || 'student',
            ...userData
        };
        mockUsers.push(newUser);
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
        await delay(400);
        let filtered = careers;
        if (category !== 'All') {
            filtered = filtered.filter(c => c.category === category);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
        }
        return filtered;
    },

    getRecommendedCareers: async (interests = []) => {
        await delay(300);
        if (!interests || interests.length === 0) return careers.slice(0, 3);
        return careers.filter(c => interests.includes(c.category)).slice(0, 3);
    },

    addCareer: async (career) => {
        await delay(500);
        const newCareer = { id: `c${careers.length + 1}`, ...career };
        careers.push(newCareer);
        return newCareer;
    },

    deleteCareer: async (id) => {
        await delay(400);
        const index = careers.findIndex(c => c.id === id);
        if (index > -1) careers.splice(index, 1);
        return true;
    },

    // Counselors
    getCounselors: async () => {
        await delay(300);
        return counselors;
    },

    // Sessions
    getSessionsByUser: async (userId) => {
        await delay(400);
        return mockSessions.filter(s => s.userId === userId);
    },

    getAllSessions: async () => {
        await delay(400);
        return mockSessions;
    },

    bookSession: async (sessionData) => {
        await delay(600);
        const newSession = {
            id: `s${mockSessions.length + 1}`,
            status: 'Upcoming',
            ...sessionData
        };
        mockSessions.push(newSession);
        return newSession;
    },

    // Dashboard Stats (Admin)
    getAdminStats: async () => {
        await delay(500);
        return {
            totalUsers: mockUsers.length,
            totalSessions: mockSessions.length,
            totalCareers: careers.length,
            activeCounselors: counselors.length
        };
    }
};
