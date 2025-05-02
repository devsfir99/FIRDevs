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
import authService from '../../services/authService';

// Logo importları
import Logo from '../../assets/logo.png';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [sifreTekrar, setSifreTekrar] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

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

    // Kayıt işlemi
    try {
      setLoading(true);
      setError('');
      
      console.log('Kayıt bilgileri:', { ad, soyad, email, sifre });
      
      // authService kullanarak kayıt ol
      const userData = await authService.register({ ad, soyad, email, sifre });
      
      if (userData) {
        console.log('Register success:', userData);
        
        // Kayıt başarılı, token'ı kaydet ve otomatik giriş yap
        if (userData.token) {
          await authService.login(email, sifre);
        }
        
        // Ana sayfaya yönlendir
        navigation.replace('Home');
      } else {
        setError('Kayıt başarısız');
      }
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
        </View>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TextInput
            style={styles.input}
            placeholder="Ad"
            value={ad}
            onChangeText={setAd}
            autoCapitalize="words"
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Soyad"
            value={soyad}
            onChangeText={setSoyad}
            autoCapitalize="words"
            placeholderTextColor="#666"
          />
          
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
          
          <TextInput
            style={styles.input}
            placeholder="Şifre Tekrar"
            value={sifreTekrar}
            onChangeText={setSifreTekrar}
            secureTextEntry
            placeholderTextColor="#666"
          />

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Zaten hesabınız var mı? Giriş Yapın</Text>
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
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#1a73e8',
    fontSize: 16,
  },
});

export default RegisterScreen;