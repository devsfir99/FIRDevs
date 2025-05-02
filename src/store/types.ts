// src/store/types.ts
// Circular dependency kaldırıldı
// import store from './index'; - Bu satırı kaldırdık çünkü dairesel bağımlılık oluşturuyor

// Store tiplerini doğrudan tanımlıyoruz
export interface RootState {
  auth: AuthState;
  posts: PostsState;
  projects: ProjectsState;
  notifications: NotificationsState;
  profile: ProfileState;
}

export type AppDispatch = any; // Tam tipi, dairesel bağımlılığı kırmak için any olarak belirledik

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
  }
  
  export interface Comment {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: string;
  }
  
  export interface Post {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    commentsList?: Comment[];
    createdAt: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    technology: string;
    status: string;
    memberCount: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }
  
  export interface NotificationData {
    userId?: string;
    userName?: string;
    postId?: string;
    comment?: string;
  }
  
  export interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow';
    read: boolean;
    createdAt: string;
    data?: NotificationData;
  }
  
  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface PostsState {
    items: Post[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    likedPosts: string[];
  }
  
  export interface ProjectsState {
    items: Project[];
    loading: boolean;
    error: string | null;
  }
  
  export interface NotificationsState {
    items: Notification[];
    unread: number;
    loading: boolean;
    error: string | null;
  }

  export interface SearchState {
    query: string;
    results: (User | Post | Project)[];
    loading: boolean;
    error: string | null;
  }

  export interface ProfileState {
    user: User | null;
    posts: Post[];
    loading: boolean;
    error: string | null;
  }