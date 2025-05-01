import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Logo importları
import Logo from '../../assets/logo.png';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

// API URL - Geliştirme ve farklı ortamlar için değiştirilebilir
// iOS Simulator için: 'http://localhost:3001/api'
// Android Emulator için: 'http://10.0.2.2:3001/api'
// Gerçek cihaz için bilgisayarın IP adresi: 'http://192.168.1.X:3001/api'
const API_URL = Platform.OS === 'ios' 
  ? 'http://localhost:3001/api' 
  : 'http://10.0.2.2:3001/api';

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Form validasyonu
    if (!email || !sifre) {
      setError('Lütfen tüm alanları doldurunuz');
      return;
    }

    if (!email.endsWith('@firat.edu.tr')) {
      setError('Lütfen Fırat Üniversitesi mail adresinizi kullanın');
      return;
    }

    // API kullanımı
    try {
      setLoading(true);
      setError('');
      
      console.log('Giriş bilgileri:', { email, sifre });
      console.log('API URL:', API_URL);
      
      // API isteği
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        sifre
      });
      
      console.log('Login response:', response.data);
      
      // Token'ı kaydet
      await AsyncStorage.setItem('token', response.data.token);
      
      // Ana sayfaya yönlendir
      navigation.replace('Home');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response) {
        // Sunucudan hata yanıtı alındı
        setError(error.response.data?.message || 'Giriş başarısız');
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
        </View>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="E-posta (@firat.edu.tr)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={sifre}
            onChangeText={setSifre}
            secureTextEntry
            placeholderTextColor="#666"
          />

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>Hesabınız yok mu? Kayıt Olun</Text>
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
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a73e8',
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
  loginButton: {
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#1a73e8',
    fontSize: 16,
  },
});

export default LoginScreen;
