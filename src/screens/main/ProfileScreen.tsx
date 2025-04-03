import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView ,Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockNotifications } from '../../services/mockData';
import { Notification } from '../../types/post';


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

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [isSharedPostsExpanded, setIsSharedPostsExpanded] = useState(false);

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
          <Text style={styles.userName}>Oğulcan Demir</Text>
          <Text style={styles.userEmail}>240541016@firat.edu.tr</Text>
          <Text style={styles.userBio}>React Native Developer | FIRDevs Member</Text>
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
          <TouchableOpacity style={styles.logoutButton}
            onPress={() => navigation.navigate('Login')}
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
    shadowOpacity: 0.25,
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
    alignItems: 'center',
  },

  headerLogo: {
    width: 40,
    height: 40,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  headerButton: {
    marginRight :0,
    width: 40, 
    height: 40, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  content: {
    flex: 1,
  },
ProfileScreenContainer:{
  flexDirection: 'row',
  backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
},

  profileHeader: {
    alignItems: 'center',
    padding: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#1a73e8',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userBio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
    marginLeft: 10,
  },
  sharedPostCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sharedPostImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  sharedPostContent: {
    padding: 15,
  },
  sharedPostTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sharedPostDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sharedPostStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sharedPostDate: {
    fontSize: 12,
    color: '#666',
  },
  statText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default ProfileScreen;