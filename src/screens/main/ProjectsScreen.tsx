import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type ProjectsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Projects'>;

const ProjectsScreen = () => {
  const navigation = useNavigation<ProjectsScreenNavigationProp>();

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
          <Text style={styles.headerTitle}>Projeler</Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.createPostButton}>
          <Icon name="plus-circle" size={24} color="#fff" />
          <Text style={styles.createPostText}>Yeni Proje Oluştur</Text>
        </TouchableOpacity>

        <View style={styles.projectList}>
          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Icon name="code-braces" size={32} color="#1a73e8" />
                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectTitle}>FIRDevs Mobile</Text>
                  <Text style={styles.projectSubtitle}>React Native</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="dots-vertical" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.projectDescription}>
              Fırat Üniversitesi Yazılım Topluluğu mobil uygulaması. React Native ile geliştirilen modern ve kullanıcı dostu bir arayüz.
            </Text>
            <View style={styles.projectFooter}>
              <View style={styles.projectStatus}>
                <Icon name="progress-clock" size={16} color="#1a73e8" />
                <Text style={styles.statusText}>Devam Ediyor</Text>
              </View>
              <View style={styles.projectMembers}>
                <View style={styles.memberAvatars}>
                  <View style={styles.memberAvatar}>
                    <Icon name="account" size={20} color="#fff" />
                  </View>
                  <View style={[styles.memberAvatar, { backgroundColor: '#4CAF50' }]}>
                    <Icon name="account" size={20} color="#fff" />
                  </View>
                  <View style={[styles.memberAvatar, { backgroundColor: '#FF9800' }]}>
                    <Icon name="account" size={20} color="#fff" />
                  </View>
                </View>
                <Text style={styles.membersText}>5 Üye</Text>
              </View>
            </View>
          </View>

          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Icon name="web" size={32} color="#4CAF50" />
                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectTitle}>FIRDevs Web</Text>
                  <Text style={styles.projectSubtitle}>React</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="dots-vertical" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.projectDescription}>
              Fırat Üniversitesi Yazılım Topluluğu web sitesi. Modern ve responsive tasarım.
            </Text>
            <View style={styles.projectFooter}>
              <View style={styles.projectStatus}>
                <Icon name="check-circle" size={16} color="#4CAF50" />
                <Text style={[styles.statusText, { color: '#4CAF50' }]}>Tamamlandı</Text>
              </View>
              <View style={styles.projectMembers}>
                <View style={styles.memberAvatars}>
                  <View style={styles.memberAvatar}>
                    <Icon name="account" size={20} color="#fff" />
                  </View>
                  <View style={[styles.memberAvatar, { backgroundColor: '#4CAF50' }]}>
                    <Icon name="account" size={20} color="#fff" />
                  </View>
                </View>
                <Text style={styles.membersText}>3 Üye</Text>
              </View>
            </View>
          </View>

          <View style={styles.projectCard}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <Icon name="robot" size={32} color="#FF9800" />
                <View style={styles.projectTitleContainer}>
                  <Text style={styles.projectTitle}>AI Chat Bot</Text>
                  <Text style={styles.projectSubtitle}>Python</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="dots-vertical" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.projectDescription}>
              Yapay zeka destekli sohbet botu. Öğrencilere yardımcı olmak için geliştirilen akıllı asistan.
            </Text>
            <View style={styles.projectFooter}>
              <View style={styles.projectStatus}>
                <Icon name="progress-clock" size={16} color="#1a73e8" />
                <Text style={styles.statusText}>Geliştirme Aşamasında</Text>
              </View>
              <View style={styles.projectMembers}>
                <View style={styles.memberAvatars}>
                  <View style={styles.memberAvatar}>
                    <Icon name="account" size={20} color="#fff" />
                  </View>
                </View>
                <Text style={styles.membersText}>1 Üye</Text>
              </View>
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
  addButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  createPostButton: {
    backgroundColor: '#1a73e8',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createPostText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  projectList: {
    padding: 20,
  },
  projectCard: {
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
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  projectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectTitleContainer: {
    marginLeft: 15,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  projectSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#1a73e8',
    marginLeft: 5,
  },
  projectMembers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  memberAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -8,
  },
  membersText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProjectsScreen; 