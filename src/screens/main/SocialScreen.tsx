import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type SocialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Social'>;

const SocialScreen = () => {
  const navigation = useNavigation<SocialScreenNavigationProp>();

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
          <Text style={styles.headerTitle}>Sosyal</Text>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="account" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.postList}>
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Icon name="account" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={styles.userName}>Ahmet Yılmaz</Text>
                  <Text style={styles.postTime}>2 saat önce</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="dots-vertical" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postContent}>
              Bugün FIRDevs topluluğunda harika bir workshop gerçekleştirdik! React Native ile mobil uygulama geliştirme konusunda temel bilgileri öğrendik. Katılan herkese teşekkürler! 🚀
            </Text>
            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="heart-outline" size={24} color="#666" />
                <Text style={styles.actionText}>24</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="comment-outline" size={24} color="#666" />
                <Text style={styles.actionText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share-outline" size={24} color="#666" />
                <Text style={styles.actionText}>Paylaş</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: '#4CAF50' }]}>
                  <Icon name="account" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={styles.userName}>Ayşe Demir</Text>
                  <Text style={styles.postTime}>5 saat önce</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="dots-vertical" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.postContent}>
              Yeni projemiz olan FIRDevs Mobile uygulaması için gönüllü geliştiriciler arıyoruz! React Native bilgisi olan arkadaşlarımızı bekliyoruz. Detaylı bilgi için DM atabilirsiniz. 💻
            </Text>
            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="heart-outline" size={24} color="#666" />
                <Text style={styles.actionText}>42</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="comment-outline" size={24} color="#666" />
                <Text style={styles.actionText}>15</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share-outline" size={24} color="#666" />
                <Text style={styles.actionText}>Paylaş</Text>
              </TouchableOpacity>
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
  profileButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  postList: {
    padding: 20,
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});

export default SocialScreen;