import axios from 'axios';
import { Post } from '../types';

const api = axios.create({
  baseURL: 'API_URL_HERE', // URL BACKEND
});

// Login and Register API
export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await api.post('/register', data);
  return response.data;
};

// Posts API
export const getPosts = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createPost = async (post: Omit<Post, 'id' | 'userId' | 'createdAt'>) => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const updatePost = async (id: number, post: Partial<Post>) => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};

// Categories API
export const createCategory = async (data: { name: string }) => {
  const response = await api.post('/categories', data);  // Sesuaikan dengan endpoint untuk membuat kategori
  return response.data;
};
