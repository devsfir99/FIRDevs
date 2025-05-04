import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';
import { User } from '../types/auth';

// API URL ayarı - cihaz tipine göre
const API_URL = Platform.OS === 'ios' 
  ? 'http://localhost:3001/api' 
  : 'http://10.0.2.2:3001/api';

// Token'dan bilgileri çıkarmak için decoder fonksiyonu
function parseJwt(token: string) {
    try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token parse error:', error);
    return null;
  }
}

// Base64 decode için polyill
const atob = (input: string) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = input.replace(/=+$/, '');
  let output = '';

  for (let bc = 0, bs = 0, buffer, i = 0;
    buffer = str.charAt(i++);
    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    buffer = chars.indexOf(buffer);
  }

  return output;
};

// Auth service özellikleri
const authService = {
  // Kullanıcı girişi
  login: async (email: string, sifre: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        sifre
      });
      
      if (response.data && response.data.token) {
        // Token'ı kaydet
        await AsyncStorage.setItem('token', response.data.token);

        // Kullanıcı bilgilerini tüm hatalarıyla kaydet
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Kullanıcı kaydı
  register: async (userData: { ad: string, soyad: string, email: string, sifre: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      
      // Başarılı kayıt sonrası token ve kullanıcı bilgilerini kaydet
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  // Çıkış yapma
  logout: async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },

  // Kullanıcı oturumunu kontrol etme
  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return !!token; // Boolean olarak dönüştür
    } catch (error) {
      console.error('Session check error:', error);
      return false;
    }
  },

  // Mevcut kullanıcı bilgilerini alma
  getCurrentUser: async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        return JSON.parse(userJson);
      }
        return null;
    } catch (error) {
      console.error('Get current user error:', error);
        return null;
      }
  },
  
  // Token'dan kullanıcı ID'sini çıkarma
  getUserIdFromToken: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return null;
      
      const decodedToken = parseJwt(token);
      return decodedToken?.id || null;
    } catch (error) {
      console.error('Get user ID error:', error);
      return null;
    }
  },

  // Profil bilgilerini sunucudan alma
  getProfile: async () => {
    try {
      console.log('[authService] getProfile isteği başlatılıyor');
      
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      // /auth/me yerine /user/profile kullan - böylece tüm profil bilgileri 
      // aynı endpoint'ten gelecek
      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('[authService] getProfile cevabı:', JSON.stringify(response.data, null, 2));
      
      // Güncel kullanıcı bilgilerini güncelle
      if (response.data) {
        // Önce mevcut verileri al
        const existingUserJson = await AsyncStorage.getItem('user');
        let existingUser = existingUserJson ? JSON.parse(existingUserJson) : {};
        
        // Token bilgisini koru
        const updatedUser = { 
          ...existingUser, 
          ...response.data,
          token: existingUser.token // Token bilgisini koru
        };
        
        // Güncellenmiş veriyi kaydet
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('[authService] AsyncStorage (getProfile) güncellendi');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('[authService] getProfile hatası:', error.message);
      if (error.response) {
        console.error('Hata detayları:', error.response.data);
      }
      throw error;
    }
  },
  
  // Profil bilgilerini güncelleme
  updateProfile: async (profileData: Partial<User>) => {
    try {
      console.log('[authService] updateProfile isteği başlatılıyor:', JSON.stringify(profileData, null, 2));
      
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      // API isteğini yap
      const response = await axios.put(`${API_URL}/user/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('[authService] updateProfile cevabı:', JSON.stringify(response.data, null, 2));
      
      // Cevap verilerini doğrula
      if (!response.data) {
        throw new Error('Sunucudan gelen yanıtta veri bulunamadı');
      }
      
      // Güncel kullanıcı bilgilerini güncelle
      try {
        // Önce mevcut verileri al
        const existingUserJson = await AsyncStorage.getItem('user');
        if (!existingUserJson) {
          throw new Error('Mevcut kullanıcı verileri bulunamadı');
        }
        
        const existingUser = JSON.parse(existingUserJson) as User & { token: string };
        
        // Sunucudan gelen yanıt verilerini kontrol et
        if (profileData.fakulte && !response.data.fakulte) {
          console.warn('[authService] Uyarı: Sunucudan gelen yanıtta fakulte alanı eksik!');
        }
        
        if (profileData.bolum && !response.data.bolum) {
          console.warn('[authService] Uyarı: Sunucudan gelen yanıtta bolum alanı eksik!');
        }
        
        if (profileData.skills && !response.data.skills) {
          console.warn('[authService] Uyarı: Sunucudan gelen yanıtta skills alanı eksik!');
        }
        
        if (profileData.socialMedia && !response.data.socialMedia) {
          console.warn('[authService] Uyarı: Sunucudan gelen yanıtta socialMedia alanı eksik!');
        }
        
        // Doğrudan sunucudan gelen tüm güncellenmiş değerleri kullan
        const updatedUser: User & { token: string } = {
          ...existingUser,
          ...response.data,
          // Anahtar işlemleri için token bilgisini koru
          token: existingUser.token
        };
        
        console.log('[authService] AsyncStorage için güncellenmiş kullanıcı verisi:', JSON.stringify(updatedUser, null, 2));
        
        // Kritik alanların kontrolü
        console.log('[authService] Kontrol - fakulte:', updatedUser.fakulte || 'boş');
        console.log('[authService] Kontrol - bolum:', updatedUser.bolum || 'boş');
        console.log('[authService] Kontrol - bio:', updatedUser.bio || 'boş');
        console.log('[authService] Kontrol - skills:', updatedUser.skills || 'boş');
        console.log('[authService] Kontrol - socialMedia:', JSON.stringify(updatedUser.socialMedia || {}, null, 2));
        
        // Güncellenmiş veriyi kaydet
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('[authService] AsyncStorage güncellendi');
        
        // Başarılı bildirim için güncellenmiş kullanıcı bilgisini döndür
        return updatedUser;
      } catch (asyncError) {
        console.error('[authService] AsyncStorage güncelleme hatası:', asyncError);
        // AsyncStorage hatası olsa bile API yanıtını döndür
        return response.data as User;
      }
    } catch (error: any) {
      console.error('[authService] updateProfile hatası:', error.message);
      if (error.response) {
        console.error('Hata detayları:', error.response.data);
      }
      throw error;
    }
  }
};

export default authService; 