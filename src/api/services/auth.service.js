import { axiosInstance } from '../apiClient';

export const authService = {
  login: async (credentials) => {
    const { data } = await axiosInstance.post('/auth/login', credentials);
    return data;
  },
  logout: async () => {
    await axiosInstance.post('/auth/logout');
  },
  getProfile: async () => {
    const { data } = await axiosInstance.get('/superAdmin/getUserById?id=68da25f660b5ad38866cf557');
    return data;
  },
  refreshToken: async () => {
    const { data } = await axiosInstance.post('/auth/refresh-token');
    return data;
  },
};
