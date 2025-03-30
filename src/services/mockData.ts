import { User, Post, Project, Comment, Notification } from '../store/types';

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
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Harika bir paylaşım!',
    createdAt: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    userId: '1',
    userName: 'Oğulcan Demir',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Teşekkürler, çok faydalı olmuş.',
    createdAt: '2024-03-15T11:00:00Z',
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
    title: 'React Native Sosyal Medya',
    description: 'Mobil sosyal medya uygulaması geliştirme projesi',
    technology: 'React Native, TypeScript',
    status: 'Devam Ediyor',
    memberCount: 3,
    image: 'https://example.com/project1.jpg',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    userId: '1'
  },
  {
    id: '2',
    title: 'Web Tabanlı Proje Yönetimi',
    description: 'Ekip yönetimi ve proje takibi için web uygulaması',
    technology: 'React, Node.js',
    status: 'Planlanıyor',
    memberCount: 4,
    createdAt: '2024-03-14T15:00:00Z',
    updatedAt: '2024-03-14T15:00:00Z',
    userId: '2'
  },
]; 