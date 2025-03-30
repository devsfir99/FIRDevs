import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { RootStackParamList } from '../../navigation/types';

type ProjectDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProjectDetail'>;
type ProjectDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProjectDetailScreen = () => {
  const navigation = useNavigation<ProjectDetailScreenNavigationProp>();
  const route = useRoute<ProjectDetailScreenRouteProp>();
  const { projectId } = route.params;

  const project = useSelector((state: RootState) =>
    state.projects.items.find(p => p.id === projectId)
  );

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Proje Detayı</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Icon name="magnify" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Icon name="bell" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Proje bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Proje Detayı</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon name="magnify" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="bell" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.title}</Text>
          <View style={styles.projectMeta}>
            <View style={styles.metaItem}>
              <Icon name="code-tags" size={20} color="#666" />
              <Text style={styles.metaText}>{project.technology}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="account-group" size={20} color="#666" />
              <Text style={styles.metaText}>{project.memberCount || 0} Üye</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="flag" size={20} color="#666" />
              <Text style={styles.metaText}>{project.status}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Proje Açıklaması</Text>
          <Text style={styles.description}>{project.description}</Text>

          {project.image && (
            <Image
              source={{ uri: project.image }}
              style={styles.projectImage}
              resizeMode="cover"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1a73e8',
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  projectInfo: {
    padding: 20,
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  projectMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  metaText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  projectImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default ProjectDetailScreen; 