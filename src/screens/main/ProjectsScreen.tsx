import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import * as ImagePicker from 'expo-image-picker';

import { mockProjects, Project } from '../../services/mockData';
// Logo import
import ProjectsLogo from '../../assets/projects.png';
import Logo from '../../assets/logo.png';
import SearchLogo from '../../assets/search.png';
import NotificationLogo from '../../assets/notification.png';
import SocialLogo from '../../assets/social.png';
import ProfileLogo from '../../assets/user-avatar.png';

type ProjectsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Projects'>;

const ProjectsScreen = () => {
  const navigation = useNavigation<ProjectsScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());

  const handleLike = (projectId: string) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const renderProjectCard = ({ item }: { item: Project }) => (
    <TouchableOpacity 
      style={styles.projectCard}
      onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
    >
      <View style={styles.projectHeader}>
        <Image source={{ uri: item.author.avatar }} style={styles.authorAvatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{item.author.name}</Text>
          <Text style={styles.projectDate}>{item.date}</Text>
        </View>
      </View>
      <Image source={{ uri: item.image }} style={styles.projectImage} />
      <View style={styles.projectContent}>
        <Text style={styles.projectTitle}>{item.title}</Text>
        <Text style={styles.projectDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.projectStats}>
          <TouchableOpacity 
            style={[styles.statItem, likedProjects.has(item.id) && styles.likedItem]}
            onPress={(e) => {
              e.stopPropagation();
              handleLike(item.id);
            }}
          >
            <Icon 
              name={likedProjects.has(item.id) ? "heart" : "heart-outline"} 
              size={20} 
              color={likedProjects.has(item.id) ? "#ff3b30" : "#666"} 
            />
            <Text style={[styles.statText, likedProjects.has(item.id) && styles.likedText]}>
              {item.likes + (likedProjects.has(item.id) ? 1 : 0)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statItem}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate('ProjectDetail', { projectId: item.id });
            }}
          >
            <Icon name="comment-outline" size={20} color="#666" />
            <Text style={styles.statText}>{item.comments}</Text>
          </TouchableOpacity>
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
          <Text style={styles.headerTitle}>Projeler</Text>
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

      <FlatList
        data={mockProjects}
        renderItem={renderProjectCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
      {/* Alt Menü */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Image 
            source={Logo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text style={styles.bottomMenuText}>Ana Sayfa</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Projects')}
        >
          <Image 
            source={ProjectsLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text style={styles.bottomMenuText}>Projeler</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Social')}
        >
          <Image 
            source={SocialLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text style={styles.bottomMenuText}>Sosyal</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.bottomMenuItem}
          onPress={() => navigation.navigate('Profile', { userId: 'current' })}
        >
          <Image 
            source={ProfileLogo} 
            style={styles.iconStyle}
            resizeMode="contain"
          />
          <Text style={[styles.bottomMenuText, styles.activeBottomMenuText]}>Profil</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 15,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  projectContent: {
    padding: 15,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  projectDate: {
    fontSize: 12,
    color: '#666',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  projectStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  likedItem: {
    backgroundColor: '#fff1f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  likedText: {
    color: '#ff3b30',
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
});

export default ProjectsScreen; 