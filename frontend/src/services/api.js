import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const submitResponse = (data) => api.post('/api/responses', data);
export const getStats = () => api.get('/api/responses/stats');
export const getResponses = (params) => api.get('/api/responses', { params });
export const getResponseById = (id) => api.get(`/api/responses/${id}`);

export default api;