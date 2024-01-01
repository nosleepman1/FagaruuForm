import api from './api';

export const submitResponse = (payload) => api.post('/api/responses', payload);
export const fetchStats = () => api.get('/api/responses/stats');
export const fetchResponses = (params = {}) => api.get('/api/responses', { params });
export const fetchResponseById = (id) => api.get(`/api/responses/${id}`);
