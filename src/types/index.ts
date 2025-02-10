export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  tags?: string[];
}
