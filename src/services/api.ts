import axios from 'axios';
import { User, Career, Course, Mission, RecommendationResponse } from '../types';

const API = axios.create({
  baseURL: '/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillsphere_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (email: string, password: string) => {
    const res = await API.post('/auth/login', { email, password });
    return res.data;
  },
  register: async (userData: any) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },
  googleLogin: async (payload: { googleToken?: string; email: string; name?: string; picture?: string }) => {
    const res = await API.post('/auth/google', payload);
    return res.data;
  },
  getMe: async () => {
    const res = await API.get('/auth/me');
    return res.data.user;
  }
};

export const userService = {
  updateProfile: async (profileData: Partial<User>) => {
    const res = await API.put('/users/profile', profileData);
    return res.data.user;
  },
  completeOnboarding: async (onboardingData: any) => {
    const res = await API.post('/users/onboarding', onboardingData);
    return res.data.user;
  }
};

export const careerService = {
  getCareers: async (): Promise<Career[]> => {
    const res = await API.get('/careers');
    return res.data;
  },
  getCareerById: async (id: string): Promise<Career> => {
    const res = await API.get(`/careers/${id}`);
    return res.data;
  }
};

export const recommendationService = {
  getRecommendations: async (): Promise<RecommendationResponse> => {
    const res = await API.get('/recommendations/me');
    return res.data;
  },
  generateRecommendations: async (): Promise<RecommendationResponse> => {
    const res = await API.post('/recommendations/generate');
    return res.data;
  },
  analyzeSkillGap: async (targetCareerId: string) => {
    const res = await API.post('/skill-gap/analyze', { targetCareerId });
    return res.data;
  }
};

export const questService = {
  getMissions: async (): Promise<Mission[]> => {
    const res = await API.get('/missions');
    return res.data;
  },
  completeMission: async (missionId: string) => {
    const res = await API.post(`/missions/${missionId}/complete`);
    return res.data;
  }
};

export const courseService = {
  getCourses: async (): Promise<Course[]> => {
    const res = await API.get('/courses');
    return res.data;
  }
};

export const searchService = {
  searchGlobal: async (query: string) => {
    const res = await API.get('/search', { params: { q: query } });
    return res.data;
  }
};

export const adminService = {
  getAdminStats: async () => {
    const res = await API.get('/admin/stats');
    return res.data;
  },
  addCareer: async (careerData: Partial<Career>) => {
    const res = await API.post('/admin/careers', careerData);
    return res.data;
  }
};
