import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import authService from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../../assets/logo.png';
import ProjectsLogo from '../../assets/projects.png';
import SocialLogo from '../../assets/social.png';
import SearchLogo from '../../assets/search.png';
import NotificationLogo from '../../assets/notification.png';
import ProfileLogo from '../../assets/social.png';
import UserAvatarLogo from '../../assets/user-avatar.png';
import LogoutLogo from '../../assets/logout.png'

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface SharedPost {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: number;
  comments: number;
  date: string;
}

// Kullanıcı profil tipi
interface UserProfile {
  _id: string;
  ad: string;
  soyad: string;
  email: string;
  bio?: string;
  profileImage?: string;
  createdAt?: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [isSharedPostsExpanded, setIsSharedPostsExpanded] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kullanıcı profilini yükle
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // AsyncStorage'dan kullanıcı verilerini al
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUserProfile(userData);
        } else {
          // Eğer yerel depolamada yoksa API'den getir
          const profile = await authService.getProfile();
          setUserProfile(profile);
        }
      } catch (err) {
        console.error('Profil yükleme hatası:', err);
        setError('Profil bilgileri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  // Çıkış yapma işlemi
  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Çıkış Yap',
          onPress: async () => {
            try {
              await authService.logout();
              navigation.replace('Login');
            } catch (err) {
              console.error('Çıkış yapma hatası:', err);
              Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu');
            }
          }
        }
      ]
    );
  };

  // Örnek paylaşılan gönderiler
  const sharedPosts: SharedPost[] = [
    {
      id: '1',
      title: 'FIRDevs Mobil Uygulama',
      description: 'Fırat Üniversitesi öğrencileri için geliştirilen mobil uygulama',
      image: 'https://picsum.photos/400/200',
      likes: 120,
      comments: 45,
      date: '2024-03-20',
    },
    {
      id: '2',
      title: 'Yapay Zeka Destekli Öğrenme Platformu',
      description: 'Öğrencilerin öğrenme süreçlerini yapay zeka ile destekleyen platform',
      image: 'https://picsum.photos/400/201',
      likes: 85,
      comments: 32,
      date: '2024-03-19',
    },
  ];

  const renderSharedPost = ({ item }: { item: SharedPost }) => (
    <TouchableOpacity 
      style={styles.sharedPostCard}
      onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.sharedPostImage} />
      <View style={styles.sharedPostContent}>
        <Text style={styles.sharedPostTitle}>{item.title}</Text>
        <Text style={styles.sharedPostDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.sharedPostStats}>
          <View style={styles.statItem}>
            <Icon name="heart-outline" size={20} color="#666" />
            <Text style={styles.statText}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="comment-outline" size={20} color="#666" />
            <Text style={styles.statText}>{item.comments}</Text>
          </View>
          <Text style={styles.sharedPostDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Yükleniyor durumu
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Profil yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Icon name="alert-circle-outline" size={64} color="#ff6b6b" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.retryButtonText}>Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
            source={Logo} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Image 
            source={SearchLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Image 
            source={NotificationLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="account" size={40} color="#fff" />
            </View>
            {/*<TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={20} color="#fff" />
            </TouchableOpacity>*/}
          </View>
          <Text style={styles.userName}>{userProfile?.ad} {userProfile?.soyad}</Text>
          <Text style={styles.userEmail}>{userProfile?.email}</Text>
          <Text style={styles.userBio}>{userProfile?.bio || 'FIRDevs Üyesi'}</Text>
        </View>

        {/*<View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Projeler</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2100</Text>
            <Text style={styles.statLabel}>Takipçi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Takip</Text>
          </View>
        </View>*/}

        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setIsSharedPostsExpanded(!isSharedPostsExpanded)}
          >
            <Text style={styles.sectionTitle}>Paylaşılan Gönderiler</Text>
            <Icon 
              name={isSharedPostsExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {isSharedPostsExpanded && (
            <FlatList
              data={sharedPosts}
              renderItem={renderSharedPost}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Image
              source={UserAvatarLogo}
              style={styles.iconStyle}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Profili Düzenle</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Image
              source={NotificationLogo}
              style={styles.iconStyle}
              resizeMode="contain"
            />
            <Text style={styles.menuText}>Bildirimler</Text>
            
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            
          >
            <Icon name="lock-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Gizlilik</Text>
            
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yardım ve Destek</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-circle-outline" size={24} color="#666" />
            <Text style={styles.menuText}>Yardım Merkezi</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="message-outline" size={24} color="#666" />
            <Text style={styles.menuText}>İletişim</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Image
              source={LogoutLogo}
              style={styles.iconStyle}
              resizeMode="contain"
            />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
            
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 35,
    height: 35,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 5,
    marginLeft: 15,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  content: {
    flex: 1,
    padding: 15,
},
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a73e8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    backgroundColor: '#1a73e8',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  userBio: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statText: {
    marginLeft: 5,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logoutText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  sharedPostCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sharedPostImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  sharedPostContent: {
    flex: 1,
    padding: 10,
  },
  sharedPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sharedPostDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sharedPostStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sharedPostDate: {
    fontSize: 12,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;