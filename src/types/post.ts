export interface User {
  id: string;
  name: string;
  avatar: string | null;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  media?: string[];
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow';
  user: User;
  post?: Post;
  timestamp: string;
  isRead: boolean;
} 