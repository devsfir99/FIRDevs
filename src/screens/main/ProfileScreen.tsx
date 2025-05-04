import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, FlatList, ActivityIndicator, Alert, Animated, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
  fakulte?: string;
  bolum?: string;
  bio?: string;
  skills?: string[];
  socialMedia?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  profileImage?: string;
  createdAt?: string;
}

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [isSharedPostsExpanded, setIsSharedPostsExpanded] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Animasyon değerleri
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // Profil verilerini yükle
  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Token kontrolü
      const token = await AsyncStorage.getItem('token');
      
      // API'den güncel profil bilgilerini getir
      if (token) {
        const profile = await authService.getProfile();
        if (profile) {
          setUserProfile(profile);
          
          // Animasyonları başlat
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            })
          ]).start();
          
          return;
        }
      }
      
      // Token yoksa veya API isteği başarısız olursa AsyncStorage'dan al
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUserProfile(userData);
        
        // Animasyonları başlat
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        ]).start();
      } else {
        setError('Profil bilgileri bulunamadı. Lütfen tekrar giriş yapın.');
      }
    } catch (err) {
      console.error('Profil yükleme hatası:', err);
      setError('Profil bilgileri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // İlk yükleme
  useEffect(() => {
    loadUserProfile();
  }, []);
  
  // Ekran odaklandığında profili yenile
  useFocusEffect(
    useCallback(() => {
      console.log('[ProfileScreen] Ekran odaklandı, profil verileri yenileniyor...');
      
      // Animasyon değerlerini sıfırla
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
      
      let isMounted = true;
      
      const refreshProfile = async () => {
        try {
          if (!isMounted) return;
          
          setLoading(true);
          
          // Token kontrolü
          const token = await AsyncStorage.getItem('token');
          
          if (!token) {
            if (isMounted) {
              setError('Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
              setLoading(false);
            }
            return;
          }
          
          console.log('[ProfileScreen] Güncel profil bilgileri alınıyor...');
          
          // Öncelikle AsyncStorage'dan son kullanıcı verilerini al
          const userDataJson = await AsyncStorage.getItem('user');
          
          if (userDataJson) {
            const userData = JSON.parse(userDataJson);
            console.log('[ProfileScreen] AsyncStorage\'dan profil verileri yüklendi:', JSON.stringify(userData, null, 2));
            
            if (isMounted) {
              setUserProfile(userData);
              setLoading(false);
              setError(null);
              
              // Animasyonları başlat
              Animated.parallel([
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                  toValue: 0,
                  duration: 800,
                  useNativeDriver: true,
                }),
              ]).start();
            }
          } else {
            // AsyncStorage'da kullanıcı yoksa API'den getir
            try {
              // API'den güncel profil bilgilerini getir
              const profile = await authService.getProfile();
              
              if (isMounted) {
                setUserProfile(profile);
                setLoading(false);
                setError(null);
                
                // Animasyonları başlat  
                Animated.parallel([
                  Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                  }),
                  Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                  }),
                ]).start();
              }
            } catch (apiErr) {
              console.error('[ProfileScreen] API\'den profil getirme hatası:', apiErr);
              if (isMounted) {
                setError('Profil bilgileri yüklenirken bir hata oluştu.');
                setLoading(false);
              }
            }
          }
        } catch (err) {
          console.error('[ProfileScreen] Profil yenilenirken hata:', err);
          
          if (isMounted) {
            setError('Profil bilgileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            setLoading(false);
          }
        }
      };
      
      // Ekran odaklandığında her zaman yeni verileri yükle
      refreshProfile();
      
      // Cleanup fonksiyonu
      return () => {
        isMounted = false;
      };
    }, []) // Dependency array'i boş bırakıyoruz çünkü ekran her odaklandığında çalışmasını istiyoruz
  );

  // Sosyal medya bağlantılarını aç
  const openSocialMedia = (url: string | undefined, platform: string) => {
    if (!url) {
      Alert.alert('Hata', `${platform} profil bağlantısı ayarlanmamış.`);
      return;
    }
    
    let fullUrl = url;
    
    // URL formatını kontrol et
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      switch (platform) {
        case 'GitHub':
          fullUrl = `https://github.com/${url}`;
          break;
        case 'LinkedIn':
          fullUrl = `https://linkedin.com/in/${url}`;
          break;
        case 'Twitter':
          fullUrl = `https://twitter.com/${url}`;
          break;
        case 'Instagram':
          fullUrl = `https://instagram.com/${url}`;
          break;
      }
    }
    
    Linking.openURL(fullUrl).catch(err => {
      Alert.alert('Hata', `${platform} profil bağlantısı açılamadı: ${err.message}`);
    });
  };

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
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Icon name="pencil" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleLogout}
            >
              <Icon name="logout" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profil Üst Kısmı */}
        <Animated.View 
          style={[
            styles.profileHeader, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          <View style={styles.profileHeaderContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {userProfile?.profileImage ? (
                  <Image
                    source={{ uri: userProfile.profileImage }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Icon name="account" size={60} color="#fff" />
                )}
              </View>
            </View>
            
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>
                {userProfile?.ad} {userProfile?.soyad}
              </Text>
              <Text style={styles.userEmail}>{userProfile?.email}</Text>
              
              {userProfile?.fakulte && userProfile?.bolum && (
                <View style={styles.educationContainer}>
                  <Icon name="school" size={16} color="#666" />
                  <Text style={styles.educationText}>
                    {userProfile.fakulte}, {userProfile.bolum}
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          {userProfile?.bio && (
            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{userProfile.bio}</Text>
            </View>
          )}
          
          {/* Sosyal Medya Linkleri */}
          {userProfile?.socialMedia && Object.values(userProfile.socialMedia).some(value => value) && (
            <View style={styles.socialLinksContainer}>
              {userProfile.socialMedia.github && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openSocialMedia(userProfile.socialMedia?.github, 'GitHub')}
                >
                  <Icon name="github" size={24} color="#333" />
                </TouchableOpacity>
              )}
              {userProfile.socialMedia.linkedin && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openSocialMedia(userProfile.socialMedia?.linkedin, 'LinkedIn')}
                >
                  <Icon name="linkedin" size={24} color="#0077B5" />
                </TouchableOpacity>
              )}
              {userProfile.socialMedia.twitter && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openSocialMedia(userProfile.socialMedia?.twitter, 'Twitter')}
                >
                  <Icon name="twitter" size={24} color="#1DA1F2" />
                </TouchableOpacity>
              )}
              {userProfile.socialMedia.instagram && (
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => openSocialMedia(userProfile.socialMedia?.instagram, 'Instagram')}
                >
                  <Icon name="instagram" size={24} color="#E1306C" />
                </TouchableOpacity>
              )}
            </View>
          )}
        </Animated.View>
        
        {/* Yetkinlikler Bölümü */}
        {userProfile?.skills && userProfile.skills.length > 0 && (
          <Animated.View 
            style={[
              styles.section, 
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }] 
              }
            ]}
          >
            <View style={styles.sectionHeader}>
              <Icon name="lightbulb-on" size={24} color="#1a73e8" />
              <Text style={styles.sectionTitle}>Yetkinlikler</Text>
            </View>
            <View style={styles.skillsContainer}>
              {userProfile.skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
        
        {/* Projeler Bölümü */}
        <Animated.View 
          style={[
            styles.section, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }] 
            }
          ]}
        >
          <View style={styles.sectionHeader}>
            <Icon name="folder-multiple" size={24} color="#1a73e8" />
            <Text style={styles.sectionTitle}>Projeler</Text>
            <TouchableOpacity
              style={styles.expandButton}
              onPress={() => setIsSharedPostsExpanded(!isSharedPostsExpanded)}
            >
              <Icon
                name={isSharedPostsExpanded ? "chevron-up" : "chevron-down"}
                size={24}
                color="#1a73e8"
              />
            </TouchableOpacity>
          </View>
          
          {isSharedPostsExpanded ? (
            <FlatList
              data={sharedPosts}
              renderItem={renderSharedPost}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          ) : (
            sharedPosts.length > 0 && renderSharedPost({ item: sharedPosts[0] })
          )}
          
          {sharedPosts.length === 0 && (
            <View style={styles.emptyStateContainer}>
              <Icon name="file-document-outline" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>Henüz proje paylaşılmamış</Text>
            </View>
          )}
        </Animated.View>
        
        {/* Katılım Tarihi */}
        <Animated.View 
          style={[
            styles.joinDateContainer, 
            { 
              opacity: fadeAnim 
            }
          ]}
        >
          <Icon name="calendar-check" size={16} color="#666" />
          <Text style={styles.joinDateText}>
            {userProfile?.createdAt 
              ? `Katılım: ${new Date(userProfile.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}`
              : 'Katılım tarihi bilinmiyor'}
          </Text>
        </Animated.View>
      </ScrollView>
      
      {/* Alt Menü */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image 
            source={ProjectsLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text style={styles.bottomMenuText}>Ana Sayfa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Projects')}
        >
          <Icon name="folder-multiple" size={24} color="#666" />
          <Text style={styles.bottomMenuText}>Projeler</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Social')}
        >
          <Icon name="account-group" size={24} color="#666" />
          <Text style={styles.bottomMenuText}>Sosyal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.bottomMenuItem, styles.activeBottomMenuItem]}
          onPress={() => {}}
        >
          <Icon name="account-circle" size={24} color="#1a73e8" />
          <Text style={[styles.bottomMenuText, styles.activeBottomMenuText]}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#1a73e8',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 5,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  profileHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  educationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  educationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    fontWeight: '500',
  },
  bioContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#1a73e8',
    position: 'relative',
    overflow: 'hidden',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    fontStyle: 'italic',
    zIndex: 2,
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    transform: [{ scale: 1 }],
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  expandButton: {
    padding: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillItem: {
    backgroundColor: '#e8f0fe',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#d0e1fd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  skillText: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
  },
  sharedPostCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  sharedPostImage: {
    width: 100,
    height: 100,
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
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  sharedPostDate: {
    fontSize: 12,
    color: '#888',
    marginLeft: 'auto',
  },
  emptyStateContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    marginTop: 15,
    textAlign: 'center',
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(26, 115, 232, 0.08)',
    padding: 8,
    borderRadius: 50,
    alignSelf: 'center',
  },
  joinDateText: {
    fontSize: 14,
    color: '#1a73e8',
    marginLeft: 5,
    fontWeight: '500',
  },
  bottomMenu: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  bottomMenuText: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  activeBottomMenuItem: {
    borderTopWidth: 3,
    borderTopColor: '#1a73e8',
    backgroundColor: '#f8f9fa',
  },
  activeBottomMenuText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
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
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconStyle: {
    width: 24,
    height: 24,
    
  },
});

export default ProfileScreen;