import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { RootStackParamList } from '../../navigation/types';
import { launchImageLibrary } from 'react-native-image-picker';
import { mockProjects, mockComments, Project, Comment } from '../../services/mockData';

import Logo from '../../assets/logo.png';
import SearchLogo from '../../assets/search.png';
import NotificationLogo from '../../assets/notification.png';

type ProjectDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProjectDetail'>;
type ProjectDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProjectDetailScreen = () => {
  const navigation = useNavigation<ProjectDetailScreenNavigationProp>();
  const route = useRoute<ProjectDetailScreenRouteProp>();
  const { projectId } = route.params;
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [isProjectLiked, setIsProjectLiked] = useState(false);

  const project = mockProjects.find(p => p.id === projectId);

  const handleProjectLike = () => {
    setIsProjectLiked(!isProjectLiked);
  };

  const handleCommentLike = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleComment = () => {
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: {
          name: 'Oğulcan Demir',
          avatar: 'https://picsum.photos/50/50',
        },
        content: comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
      };
      setComments(prev => [newComment, ...prev]);
      setComment('');
    }
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: false,
    });

    if (result.assets && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <Image source={{ uri: item.author.avatar }} style={styles.commentAvatar} />
        <View style={styles.commentInfo}>
          <Text style={styles.commentAuthor}>{item.author.name}</Text>
          <Text style={styles.commentDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.commentContent}>{item.content}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity 
          style={[styles.actionButton, likedComments.has(item.id) && styles.likedActionButton]}
          onPress={() => handleCommentLike(item.id)}
        >
          <Icon 
            name={likedComments.has(item.id) ? "heart" : "heart-outline"} 
            size={20} 
            color={likedComments.has(item.id) ? "#ff3b30" : "#666"} 
          />
          <Text style={[styles.actionText, likedComments.has(item.id) && styles.likedActionText]}>
            {item.likes + (likedComments.has(item.id) ? 1 : 0)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="reply-outline" size={20} color="#666" />
          <Text style={styles.actionText}>Yanıtla</Text>
        </TouchableOpacity>
      </View>
    </View>
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
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
            <Text style={styles.headerTitle}>Proje Detayı</Text>
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
          <View style={styles.projectHeader}>
            <View style={styles.authorInfo}>
              <Image source={{ uri: project.author.avatar }} style={styles.authorAvatar} />
              <View>
                <Text style={styles.authorName}>{project.author.name}</Text>
                <Text style={styles.projectDate}>{project.date}</Text>
              </View>
            </View>
            <Image 
              source={{ uri: project.image }} 
              style={styles.projectImage}
            />
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <View style={styles.projectStats}>
                <TouchableOpacity 
                  style={[styles.statItem, isProjectLiked && styles.likedItem]} 
                  onPress={handleProjectLike}
                >
                  <Icon 
                    name={isProjectLiked ? "heart" : "heart-outline"} 
                    size={20} 
                    color={isProjectLiked ? "#ff3b30" : "#666"} 
                  />
                  <Text style={[styles.statText, isProjectLiked && styles.likedText]}>
                    {project.likes + (isProjectLiked ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.statItem}>
                  <Icon name="comment-outline" size={20} color="#666" />
                  <Text style={styles.statText}>{project.comments + comments.length}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Yorumlar</Text>
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>

        <View style={styles.commentInput}>
          <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
            <Icon name="image-plus" size={24} color="#666" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Yorum yaz..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleComment}>
            <Icon name="send" size={24} color="#1a73e8" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  projectHeader: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  projectImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  projectInfo: {
    padding: 15,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
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
  commentsSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  commentCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  commentInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  imageUploadButton: {
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    maxHeight: 100,
  },
  sendButton: {
    padding: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
  likedItem: {
    backgroundColor: '#fff1f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  likedText: {
    color: '#ff3b30',
  },
  likedActionButton: {
    backgroundColor: '#fff1f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  likedActionText: {
    color: '#ff3b30',
  },
});

export default ProjectDetailScreen; 