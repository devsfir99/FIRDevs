import { User, Post, Notification } from '../store/types';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Oğulcan Demir',
    email: 'ogulcan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Software Developer',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'UI/UX Designer',
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: 'Ahmet Yılmaz',
      avatar: 'https://picsum.photos/50/51',
    },
    content: 'Harika bir proje olmuş! Ben de katılmak isterim.',
    date: '2024-03-20',
    likes: 5,
  },
  {
    id: '2',
    author: {
      name: 'Mehmet Demir',
      avatar: 'https://picsum.photos/50/52',
    },
    content: 'Kod kalitesi çok iyi, tebrikler!',
    date: '2024-03-19',
    likes: 3,
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Oğulcan Demir',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    content: 'React Native ile harika bir uygulama geliştiriyorum!',
    images: ['https://picsum.photos/500/300'],
    likes: 5,
    comments: 2,
    commentsList: [
      {
        id: '1',
        userId: '2',
        userName: 'Jane Smith',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Harika görünüyor! 👏',
        createdAt: '2024-03-15T10:15:00Z',
      },
      {
        id: '2',
        userId: '1',
        userName: 'Oğulcan Demir',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Teşekkür ederim! 🙌',
        createdAt: '2024-03-15T10:30:00Z',
      },
    ],
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Yeni projemiz için fikirlerinizi bekliyorum!',
    images: ['https://picsum.photos/500/301'],
    likes: 10,
    comments: 3,
    commentsList: [
      {
        id: '3',
        userId: '1',
        userName: 'Oğulcan Demir',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Harika bir fikir, ben de katılmak isterim! 😊',
        createdAt: '2024-03-15T11:15:00Z',
      },
      {
        id: '4',
        userId: '2',
        userName: 'Jane Smith',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        content: 'Teşekkürler! ❤️',
        createdAt: '2024-03-15T11:30:00Z',
      },
      {
        id: '5',
        userId: '1',
        userName: 'John Doe',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        content: 'Rica ederim! 🌟',
        createdAt: '2024-03-15T11:45:00Z',
      },
    ],
    createdAt: '2024-03-15T11:00:00Z',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    read: false,
    createdAt: '2024-03-15T12:00:00Z',
    data: {
      userId: '2',
      userName: 'Test User',
      postId: '1',
    },
  },
  {
    id: '2',
    type: 'comment',
    read: false,
    createdAt: '2024-03-15T11:30:00Z',
    data: {
      userId: '2',
      userName: 'Test User',
      postId: '1',
      comment: 'Harika bir gönderi!',
    },
  },
  {
    id: '3',
    type: 'follow',
    read: true,
    createdAt: '2024-03-15T10:00:00Z',
    data: {
      userId: '2',
      userName: 'Test User',
    },
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'FIRDevs Mobil Uygulama',
    description: 'Fırat Üniversitesi öğrencileri için geliştirilen mobil uygulama',
    image: 'https://picsum.photos/400/200',
    likes: 120,
    comments: 45,
    author: {
      name: 'Oğulcan Demir',
      avatar: 'https://picsum.photos/50/50',
    },
    date: '2024-03-20',
  },
  {
    id: '2',
    title: 'Yapay Zeka Destekli Öğrenme Platformu',
    description: 'Öğrencilerin öğrenme süreçlerini yapay zeka ile destekleyen platform',
    image: 'https://picsum.photos/400/201',
    likes: 85,
    comments: 32,
    author: {
      name: 'Ahmet Yılmaz',
      avatar: 'https://picsum.photos/50/51',
    },
    date: '2024-03-19',
  },
]; 