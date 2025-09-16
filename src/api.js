// src/api.js
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

// Create a single axios instance so we can attach auth headers automatically
const api = axios.create({ baseURL: BACKEND_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth helpers
export const login = async (email, password) => {
  try {
    const res = await api.post('/auth/login', { email, password });
    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
    }
    return res.data;
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const register = async (email, password) => {
  try {
    const res = await api.post('/auth/register', { email, password });
    // No token expected now; user must verify first.
    return res.data; // { message: 'Registered. Please verify your email.' }
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const verifyEmail = async (token) => {
  try {
    const res = await api.post('/auth/verify-email', { token });
    if (res.data?.token) localStorage.setItem('token', res.data.token);
    return res.data; // { token, user }
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const resendVerification = async (email) => {
  try {
    const res = await api.post('/auth/resend-verification', { email });
    return res.data; // { message }
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const getMe = async () => {
  try {
    const res = await api.get('/auth/me');
    return res.data; // { user }
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Existing API calls (now use the axios instance)
export const startAudit = async (email, url) => {
  try {
    const response = await api.post('/start-audit', { email, url });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const cleanupReport = async (folderPath) => {
  try {
    const response = await api.post('/cleanup', { folderPath });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const createCheckoutSession = async (email, url, packageId = 1) => {
  try {
    const response = await api.post('/create-checkout-session', { email, url, packageId });
    return response.data; // { url }
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export const confirmPayment = async (sessionId) => {
  try {
    const response = await api.get('/confirm-payment', { params: { session_id: sessionId } });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};
