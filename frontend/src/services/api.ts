import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  verifyToken: (token: string) =>
    api.get('/auth/verify', { headers: { Authorization: `Bearer ${token}` } }),
  
  getProfile: () =>
    api.get('/auth/profile'),
  
  updateProfile: (userData: any) =>
    api.put('/auth/profile', userData),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/change-password', { currentPassword, newPassword }),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, newPassword: string) =>
    api.post('/auth/reset-password', { token, newPassword }),
  
  verifyEmail: (token: string) =>
    api.post('/auth/verify-email', { token }),
  
  resendVerification: () =>
    api.post('/auth/resend-verification'),
};

// Services API
export const servicesAPI = {
  getAll: (params?: any) =>
    api.get('/services', { params }),
  
  getById: (id: string) =>
    api.get(`/services/${id}`),
  
  getByCategory: (category: string) =>
    api.get(`/services/category/${category}`),
  
  search: (query: string) =>
    api.get(`/services/search?q=${encodeURIComponent(query)}`),
  
  getPopular: () =>
    api.get('/services/popular'),
  
  getRecommended: () =>
    api.get('/services/recommended'),
};

// Orders API
export const ordersAPI = {
  create: (orderData: any) =>
    api.post('/orders', orderData),
  
  getAll: (params?: any) =>
    api.get('/orders', { params }),
  
  getById: (id: string) =>
    api.get(`/orders/${id}`),
  
  update: (id: string, orderData: any) =>
    api.put(`/orders/${id}`, orderData),
  
  cancel: (id: string) =>
    api.post(`/orders/${id}/cancel`),
  
  getStats: () =>
    api.get('/orders/stats'),
};

// User API
export const userAPI = {
  getBalance: () =>
    api.get('/user/balance'),
  
  addFunds: (amount: number, paymentMethod: string) =>
    api.post('/user/add-funds', { amount, paymentMethod }),
  
  getTransactions: (params?: any) =>
    api.get('/user/transactions', { params }),
  
  getReferrals: () =>
    api.get('/user/referrals'),
  
  getLoyaltyPoints: () =>
    api.get('/user/loyalty-points'),
  
  redeemPoints: (points: number) =>
    api.post('/user/redeem-points', { points }),
};

// Admin API
export const adminAPI = {
  getUsers: (params?: any) =>
    api.get('/admin/users', { params }),
  
  getUserById: (id: string) =>
    api.get(`/admin/users/${id}`),
  
  updateUser: (id: string, userData: any) =>
    api.put(`/admin/users/${id}`, userData),
  
  getOrders: (params?: any) =>
    api.get('/admin/orders', { params }),
  
  getServices: (params?: any) =>
    api.get('/admin/services', { params }),
  
  createService: (serviceData: any) =>
    api.post('/admin/services', serviceData),
  
  updateService: (id: string, serviceData: any) =>
    api.put(`/admin/services/${id}`, serviceData),
  
  deleteService: (id: string) =>
    api.delete(`/admin/services/${id}`),
  
  getStats: () =>
    api.get('/admin/stats'),
  
  getAnalytics: (params?: any) =>
    api.get('/admin/analytics', { params }),
};

// Payment API
export const paymentAPI = {
  createPayment: (amount: number, method: string) =>
    api.post('/payment/create', { amount, method }),
  
  verifyPayment: (paymentId: string) =>
    api.post('/payment/verify', { paymentId }),
  
  getPaymentMethods: () =>
    api.get('/payment/methods'),
};

// WhatsApp API
export const whatsappAPI = {
  sendMessage: (messageData: any) =>
    api.post('/whatsapp/send', messageData),
  
  getTemplates: () =>
    api.get('/whatsapp/templates'),
  
  createTemplate: (templateData: any) =>
    api.post('/whatsapp/templates', templateData),
  
  getContacts: () =>
    api.get('/whatsapp/contacts'),
  
  getChats: () =>
    api.get('/whatsapp/chats'),
};

export default api;

