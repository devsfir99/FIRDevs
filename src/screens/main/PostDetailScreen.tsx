import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockPosts } from '../../services/mockData';
import { Comment } from '../../types/post';

// Logo import
import SocialLogo from '../../assets/social.png';

type PostDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostDetail'>;
type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

const PostDetailScreen = () => {
  const navigation = useNavigation<PostDetailScreenNavigationProp>();
  const route = useRoute<PostDetailScreenRouteProp>();
  const [newComment, setNewComment] = useState('');

  const post = mockPosts.find(p => p.id === route.params.postId);

  if (!post) {
    return null;
  }

  const handleLike = () => {
    // TODO: Implement like functionality
    console.log('Like post:', post.id);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // TODO: Implement comment functionality
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  const renderComment = (comment: Comment) => (
    <View key={comment.id} style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Icon name="account" size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.userName}>{comment.user.name}</Text>
            <Text style={styles.timestamp}>{comment.timestamp}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="dots-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <Text style={styles.commentContent}>{comment.content}</Text>
      <View style={styles.commentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{comment.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="reply" size={20} color="#666" />
          <Text style={styles.actionText}>Yanıtla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
            >
              <Image 
                source={SocialLogo} 
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Gönderi</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => navigation.navigate('Search')}
              >
                <Image 
                  source={require('../../assets/search.png')} 
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => navigation.navigate('Notifications')}
              >
                <Image 
                  source={require('../../assets/notification.png')} 
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <View style={styles.avatar}>
                  <Icon name="account" size={24} color="#fff" />
                </View>
                <View>
                  <Text style={styles.userName}>{post.user.name}</Text>
                  <Text style={styles.timestamp}>{post.timestamp}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Icon name="dots-horizontal" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.postActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Icon 
                  name={post.isLiked ? "heart" : "heart-outline"} 
                  size={24} 
                  color={post.isLiked ? "#e91e63" : "#666"} 
                />
                <Text style={[
                  styles.actionText,
                  post.isLiked && { color: "#e91e63" }
                ]}>{post.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="comment-outline" size={24} color="#666" />
                <Text style={styles.actionText}>{post.comments.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="share-outline" size={24} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Yorumlar</Text>
            {post.comments.map(renderComment)}
          </View>
        </ScrollView>

        <View style={styles.commentInput}>
          <View style={styles.avatar}>
            <Icon name="account" size={20} color="#fff" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Yorum yaz..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton,
              { opacity: newComment.trim() ? 1 : 0.5 }
            ]}
            onPress={handleComment}
            disabled={!newComment.trim()}
          >
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
  },
  content: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
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
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  postContent: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 24,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  commentsSection: {
    padding: 15,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  commentContainer: {
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
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    padding: 5,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});

export default PostDetailScreen; 