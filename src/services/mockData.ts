import { User, Post, Comment, Notification } from '../types/post';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Oğulcan Demir',
    avatar: null,
  },
  {
    id: '2',
    name: 'Ahmet Yılmaz',
    avatar: null,
  },
  {
    id: '3',
    name: 'Ayşe Kaya',
    avatar: null,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    user: mockUsers[1],
    content: 'Harika bir proje olmuş! 👏',
    timestamp: '1 saat önce',
    likes: 5,
  },
  {
    id: '2',
    user: mockUsers[2],
    content: 'Ben de katılmak isterim 🙋‍♀️',
    timestamp: '30 dakika önce',
    likes: 2,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: 'React Native ile harika bir uygulama geliştiriyoruz! #FIRDevs #MobilGeliştirme',
    likes: 24,
    comments: mockComments,
    timestamp: '2 saat önce',
    isLiked: false,
  },
  {
    id: '2',
    user: mockUsers[1],
    content: 'Yeni projem için ekip arkadaşları arıyorum. İlgilenenler DM atabilir.',
    likes: 15,
    comments: [],
    timestamp: '5 saat önce',
    isLiked: true,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    user: mockUsers[1],
    post: mockPosts[0],
    timestamp: '1 saat önce',
    isRead: false,
  },
  {
    id: '2',
    type: 'comment',
    user: mockUsers[2],
    post: mockPosts[0],
    timestamp: '30 dakika önce',
    isRead: false,
  },
  {
    id: '3',
    type: 'follow',
    user: mockUsers[1],
    timestamp: '2 saat önce',
    isRead: true,
  },
]; 