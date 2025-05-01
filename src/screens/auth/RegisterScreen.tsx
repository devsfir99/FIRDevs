import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import axios from 'axios';

// Logo importları
import Logo from '../../assets/logo.png';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

// API URL - Geliştirme ve farklı ortamlar için değiştirilebilir
// KULLANDIĞINIZ CİHAZA GÖRE AŞAĞIDAKİ URL'Yİ DEĞİŞTİRİN
// iOS Simulator için: 'http://localhost:3001/api'
// Android Emulator için: 'http://10.0.2.2:3001/api'
// Gerçek cihaz için bilgisayarın IP adresi: örn. 'http://192.168.1.5:3001/api'
const API_URL = Platform.OS === 'ios' 
  ? 'http://localhost:3001/api' 
  : 'http://10.0.2.2:3001/api';

const RegisterScreen = ({ navigation }: Props) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    // Form validasyonu
    if (!ad || !soyad || !email || !sifre || !sifreTekrar) {
      setError('Lütfen tüm alanları doldurunuz');
      return;
    }

    if (!email.endsWith('@firat.edu.tr')) {
      setError('Lütfen Fırat Üniversitesi mail adresinizi kullanın');
      return;
    }

    if (sifre !== sifreTekrar) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (sifre.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // API isteği
      console.log('Kayıt bilgileri:', { ad, soyad, email, sifre });
      console.log('API URL:', API_URL);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        ad,
        soyad,
        email,
        sifre
      });
      
      console.log('Register response:', response.data);
      setSuccess(true);
      
      // Başarılı kayıt sonrası kısa bir süre bekle ve giriş ekranına yönlendir
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
      
    } catch (error: any) {
      console.error('Register error:', error);
      if (error.response) {
        // Sunucudan hata yanıtı alındı
        setError(error.response.data?.message || 'Kayıt başarısız');
      } else if (error.request) {
        // Sunucuya istek yapıldı ama yanıt alınamadı
        setError('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        // İstek yapılırken bir şeyler ters gitti
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={Logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>FIRDevs Mobile</Text>
          <Text style={styles.subtitle}>Hesap Oluştur</Text>
        </View>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz...</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Ad"
            value={ad}
            onChangeText={setAd}
            autoCapitalize="words"
            placeholderTextColor="#666"
            editable={!loading && !success}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Soyad"
            value={soyad}
            onChangeText={setSoyad}
            autoCapitalize="words"
            placeholderTextColor="#666"
            editable={!loading && !success}
          />
          
          <TextInput
            style={styles.input}
            placeholder="E-posta (@firat.edu.tr)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
            editable={!loading && !success}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={sifre}
            onChangeText={setSifre}
            secureTextEntry
            placeholderTextColor="#666"
            editable={!loading && !success}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Şifre Tekrar"
            value={sifreTekrar}
            onChangeText={setSifreTekrar}
            secureTextEntry
            placeholderTextColor="#666"
            editable={!loading && !success}
          />

          <TouchableOpacity 
            style={[styles.registerButton, (loading || success) && styles.disabledButton]} 
            onPress={handleRegister}
            disabled={loading || success}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.loginLink} 
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.loginLinkText}>Zaten hesabınız var mı? Giriş yapın</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a73e8',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  registerButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#a0c4f0',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#1a73e8',
    fontSize: 16,
  },
});

export default RegisterScreen;