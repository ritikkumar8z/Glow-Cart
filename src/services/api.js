import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your internet connection.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data?.message || 'Bad request');
      case 401:
        throw new Error('Unauthorized access');
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(data?.message || 'An error occurred');
    }
  }
);

// API functions
export const fetchProducts = async (limit = 100) => {
  try {
    const response = await api.get(`/products?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export const fetchProductCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export default api;
