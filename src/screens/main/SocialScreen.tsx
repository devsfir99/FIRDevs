import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, Post } from '../../store/types';
import { fetchPosts, likePost, toggleLike } from '../../store/slices/postsSlice';
import { RootStackParamList } from '../../navigation/types';
import SocialLogo from '../../assets/social.png';
import Logo from '../../assets/logo.png';
import ProjectsLogo from '../../assets/projects.png';

import SearchLogo from '../../assets/search.png';
import EditProfileLogo from '../../assets/user-avatar.png';
import NotificationLogo from '../../assets/notification.png';
import ProfileLogo from '../../assets/social.png';
import LikeLogo from '../../assets/like.png';
import CommentLogo from '../../assets/comment.png';
import NewPostLogo from '../../assets/newpost.png';

type SocialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SocialScreen = () => {
  const navigation = useNavigation<SocialScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { items: posts, loading, likedPosts } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLike = (postId: string) => {
    try {
      dispatch(toggleLike(postId));
      if (!likedPosts.includes(postId)) {
        dispatch(likePost(postId));
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={Logo} 
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sosyal</Text>
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

      <ScrollView style={styles.content}>
        {posts.map((post: Post) => (
          <View key={post.id} style={styles.postContainer}>
            <TouchableOpacity
              style={styles.postHeader}
              onPress={() => navigation.navigate('Profile', { userId: post.userId })}
            >
              {post.userAvatar && (
                <Image
                  source={{ uri: post.userAvatar }}
                  style={styles.avatar}
                />
              )}
              <View style={styles.postHeaderInfo}>
                <Text style={styles.userName}>{post.userName}</Text>
                <Text style={styles.timestamp}>
                  {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
            >
              <Text style={styles.postContent}>{post.content}</Text>
              {post.images && post.images.length > 0 && (
                <Image
                  source={{ uri: post.images[0] }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleLike(post.id)}
                disabled={likedPosts.includes(post.id)}
              >
                {/*<Icon 
                  name={likedPosts.includes(post.id) ? "heart" : "heart-outline"} 
                  size={24} 
                  color={likedPosts.includes(post.id) ? "#ff4444" : "#666"} 
                />*/}
                <Image 
                source={LikeLogo} 
                style={[styles.iconStyle, { tintColor: likedPosts.includes(post.id) ? "#ff4444" : "#666" }]}
                resizeMode="contain"
              />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
              >
                <Image 
                source={CommentLogo} 
                style={[styles.iconStyle, { tintColor: "#1a73e8" }]}
                resizeMode="contain"
              />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Image 
        source={NewPostLogo} 
        style={styles.iconStyle}
        resizeMode="contain"
      />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerLogo: {
    width: 40,
    height: 40,
    
    
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
    justifyContent: 'flex-end',
    gap: 10,
    marginRight:10,
  },
  iconStyle: {
    width: 24,
    height: 24,
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default SocialScreen;