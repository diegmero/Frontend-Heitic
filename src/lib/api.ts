import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337',
});

export const fetchAPI = async (endpoint: string) => {
  const response = await api.get(`${endpoint}`);
  return response.data;
};

export default api;