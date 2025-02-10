import axios from 'axios';
import { LoginCredentials, Post } from '../types';

const api = axios.create({
  baseURL: 'Your_API_URL', // Replace with your actual API URL
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const register = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/register', credentials);
  return response.data;
};

// Dashboard dengan PrivateRoute
export const getPosts = async () => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};

// Dashboard tanpa PrivateRoute
// export const getPosts = async () => {
//   try {
//     const response = await api.get<Post[]>('/posts', {
//       headers: localStorage.getItem('token') ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {},
//     });
//     return response.data;
//   } catch {
//     return [];
//   }
// };


export const getPost = async (id: number) => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id' | 'userId' | 'createdAt'>) => {
  const response = await api.post<Post>('/posts', post);
  return response.data;
};

export const updatePost = async (id: number, post: Partial<Post>) => {
  const response = await api.put<Post>(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};
