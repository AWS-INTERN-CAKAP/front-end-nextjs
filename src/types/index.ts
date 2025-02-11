export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Category {
  id: number; // Adjusted to number
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  categories: { id: number; name: string }[]; // Adjusted to number
  category_ids?: number[]; // Adjusted to number
  userId: number;
  createdAt: string;
}
