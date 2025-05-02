// Auth types for authentication and user data

export interface User {
  _id: string;
  ad: string;
  soyad: string;
  email: string;
  bio?: string;
  profileImage?: string;
  createdAt?: string;
}

export interface LoginData {
  email: string;
  sifre: string;
}

export interface RegisterData {
  ad: string;
  soyad: string;
  email: string;
  sifre: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
} 