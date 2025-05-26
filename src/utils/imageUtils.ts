import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API sunucusunun temel URL'si
export const getBaseUrl = () => {
  return Platform.select({
    ios: 'http://localhost:3001',
    android: 'http://10.0.2.2:3001'
  }) || 'http://localhost:3001';
};

// Profil fotoğrafı için tam URL oluştur
export const getProfileImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;

  // Eğer tam URL ise doğrudan döndür
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Göreceli yol ise base URL ile birleştir
  const baseUrl = getBaseUrl();
  // imagePath zaten / ile başlıyorsa, fazladan / ekleme
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${path}`;
};

// Profil fotoğrafı yolunu AsyncStorage için hazırla
export const normalizeProfileImagePath = (imagePath: string): string => {
  // Tam URL'den göreceli yolu çıkar
  const baseUrl = getBaseUrl();
  if (imagePath.startsWith(baseUrl)) {
    return imagePath.replace(baseUrl, '');
  }
  return imagePath;
};

export const getFullImageUrl = (imagePath: string | null | undefined): string | null => {
  if (!imagePath) return null;
  
  // Eğer zaten tam URL ise direkt döndür
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  const baseUrl = getBaseUrl();
  return baseUrl ? `${baseUrl}${imagePath}` : null;
};

export const getProfileImageUrlAsync = async (): Promise<string | null> => {
  try {
    const currentUser = await AsyncStorage.getItem('user');
    console.log('Current user from AsyncStorage:', currentUser);
    
    if (!currentUser) return null;
    
    const userData = JSON.parse(currentUser);
    console.log('User data parsed:', userData);
    console.log('Profile image path:', userData.profileImage);
    
    const fullUrl = getProfileImageUrl(userData.profileImage);
    console.log('Full profile image URL:', fullUrl);
    
    return fullUrl;
  } catch (error) {
    console.error('Profil fotoğrafı URL alınamadı:', error);
    return null;
  }
}; 