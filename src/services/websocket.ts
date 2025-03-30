// src/services/websocket.ts
import { io, Socket } from 'socket.io-client';
import store from '../store/index';
import { addNotification } from '../store/slices/notificationsSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { Notification } from '../store/types';

class WebSocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    this.socket = io('wss://api.example.com', {
      auth: {
        token,
      },
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('notification', (notification) => {
      store.dispatch(addNotification(notification));
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

export const wsService = new WebSocketService();

export const initializeWebSocket = (dispatch: Dispatch) => {
  // WebSocket bağlantısını simüle ediyoruz
  console.log('WebSocket bağlantısı başlatıldı');

  // Bildirim geldiğinde
  const handleNotification = (notification: Notification) => {
    dispatch(addNotification(notification));
  };

  // Test için örnek bildirim
  setTimeout(() => {
    handleNotification({
      id: String(Date.now()),
      type: 'like',
      read: false,
      createdAt: new Date().toISOString(),
      data: {
        userId: '2',
        userName: 'Test User',
        postId: '1',
      },
    });
  }, 5000);

  return () => {
    console.log('WebSocket bağlantısı kapatıldı');
  };
};