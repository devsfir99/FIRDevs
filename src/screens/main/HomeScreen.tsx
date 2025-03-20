import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockNotifications } from '../../services/mockData';
import { Notification } from '../../types/post';

// Logo importları
import Logo from '../../assets/logo.png';
import ProjectsLogo from '../../assets/projects.png';
import SocialLogo from '../../assets/social.png';
import SearchLogo from '../../assets/search.png';

import NotificationLogo from '../../assets/notification.png';
import ProfileLogo from '../../assets/social.png';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={Logo} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
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
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image 
            source={ProfileLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="folder-multiple" size={24} color="#1a73e8" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Aktif Projeler</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="account-group" size={24} color="#1a73e8" />
            <Text style={styles.statNumber}>256</Text>
            <Text style={styles.statLabel}>Üyeler</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="calendar" size={24} color="#1a73e8" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Etkinlikler</Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Projects')}
          >
            <View style={styles.cardContent}>
              <Image 
                source={ProjectsLogo}
                style={styles.cardLogo}
                resizeMode="contain"
              />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Projeler</Text>
                <Text style={styles.cardDescription}>
                  Aktif projeleri görüntüle ve yeni projeler oluştur
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Social')}
          >
            <View style={styles.cardContent}>
              <Image 
                source={SocialLogo}
                style={styles.cardLogo}
                resizeMode="contain"
              />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Sosyal</Text>
                <Text style={styles.cardDescription}>
                  Gönderileri görüntüle ve topluluktaki diğer üyelerle etkileşime geç
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.cardHeader}>
              <Icon name="account" size={32} color="#FF9800" />
              <Text style={styles.cardTitle}>Profil</Text>
            </View>
            <Text style={styles.cardDescription}>
              Profil bilgilerini düzenle ve ayarları yönet
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="code-braces" size={24} color="#1a73e8" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>FIRDevs Mobile</Text>
                <Text style={styles.activityDescription}>Yeni özellik eklendi: Sosyal medya entegrasyonu</Text>
              </View>
              <Text style={styles.activityTime}>2 saat önce</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="account-group" size={24} color="#4CAF50" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Workshop</Text>
                <Text style={styles.activityDescription}>React Native ile Mobil Uygulama Geliştirme</Text>
              </View>
              <Text style={styles.activityTime}>1 gün önce</Text>
            </View>

            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="calendar" size={24} color="#FF9800" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Etkinlik</Text>
                <Text style={styles.activityDescription}>Yazılım Kariyer Günleri 2024</Text>
              </View>
              <Text style={styles.activityTime}>3 gün önce</Text>
            </View>
          </View>
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // veya ihtiyacınıza göre bir değer
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
  
  headerLogo: {
    width: 40,
    height: 40,
    
    
  },
  iconStyle: {
    width: 24,
    height: 24,
    
  },
  
  
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginRight:10,
  },
  headerButton: {
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
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
    marginTop: 5,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  activitySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  activityList: {
    backgroundColor: '#fff',
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
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;