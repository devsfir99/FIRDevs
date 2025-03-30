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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/types';
import { likePost, commentOnPost, toggleLike } from '../../store/slices/postsSlice';
import { RootStackParamList } from '../../navigation/types';

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;
type PostDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PostDetailScreen = () => {
  const navigation = useNavigation<PostDetailScreenNavigationProp>();
  const route = useRoute<PostDetailScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [comment, setComment] = useState('');

  const post = useSelector((state: RootState) =>
    state.posts.items.find(p => p.id === route.params.postId)
  );

  const isLiked = useSelector((state: RootState) =>
    state.posts.likedPosts.includes(route.params.postId)
  );

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#1a73e8" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Gönderi Detayı</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Gönderi bulunamadı</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleLike = () => {
    dispatch(toggleLike(post.id));
    if (!isLiked) {
      dispatch(likePost(post.id));
    }
  };

  const handleComment = () => {
    if (comment.trim()) {
      dispatch(commentOnPost({ postId: post.id, comment: comment.trim() }));
      setComment('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#1a73e8" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Gönderi Detayı</Text>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Icon name="magnify" size={24} color="#1a73e8" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Icon name="bell" size={24} color="#1a73e8" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() =>
                  navigation.navigate('Profile', { userId: post.userId })
                }
              >
                {post.userAvatar && (
                  <Image
                    source={{ uri: post.userAvatar }}
                    style={styles.avatar}
                  />
                )}
                <Text style={styles.userName}>{post.userName}</Text>
              </TouchableOpacity>
              <Text style={styles.timestamp}>
                {new Date(post.createdAt).toLocaleDateString('tr-TR')}
              </Text>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.images && post.images.length > 0 && (
              <Image
                source={{ uri: post.images[0] }}
                style={styles.postImage}
                resizeMode="cover"
              />
            )}

            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleLike}
              >
                <Icon 
                  name={isLiked ? "heart" : "heart-outline"} 
                  size={24} 
                  color={isLiked ? "#ff4444" : "#666"} 
                />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>

              <View style={styles.actionButton}>
                <Icon name="comment" size={24} color="#1a73e8" />
                <Text style={styles.actionText}>{post.comments}</Text>
              </View>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Yorumlar</Text>
            {post.commentsList?.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <View style={styles.commentHeader}>
                  <View style={styles.commentUser}>
                    {comment.userAvatar && (
                      <Image
                        source={{ uri: comment.userAvatar }}
                        style={styles.commentAvatar}
                      />
                    )}
                    <Text style={styles.commentUserName}>{comment.userName}</Text>
                  </View>
                  <Text style={styles.commentTime}>
                    {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                  </Text>
                </View>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Yorum yaz..."
            value={comment}
            onChangeText={setComment}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !comment.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleComment}
            disabled={!comment.trim()}
          >
            <Icon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  postContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
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
  commentsSection: {
    padding: 15,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  headerButton: {
    padding: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostDetailScreen; 