import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/slices/postsSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { AppDispatch } from '../../store/types';
import NewPostLogo from '../../assets/newpost.png';
import Logo from '../../assets/logo.png';

type CreatePostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreatePost'>;

const CreatePostScreen = () => {
  const navigation = useNavigation<CreatePostScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMedia = () => {
    // TODO: Implement media picker
    console.log('Add media');
  };

  const handlePost = async () => {
    if (!postText.trim()) return;

    setIsLoading(true);
    try {
      await dispatch(createPost({ content: postText, images: selectedMedia }));
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create post:', error);
      // TODO: Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image 
                source={Logo} 
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={[
                  styles.shareButton,
                  !postText.trim() && styles.shareButtonDisabled
                ]}
                onPress={handlePost}
                disabled={!postText.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={[
                    styles.shareButtonText,
                    !postText.trim() && styles.shareButtonTextDisabled
                  ]}>Paylaş</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Ne düşünüyorsun?"
            placeholderTextColor="#666"
            multiline
            value={postText}
            onChangeText={setPostText}
            autoFocus
          />
          
          {selectedMedia.map((media, index) => (
            <Image
              key={index}
              source={{ uri: media }}
              style={styles.mediaPreview}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.mediaButton}
            onPress={handleAddMedia}
          >
            <Text style={styles.mediaButtonText}>Medya Ekle</Text>
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
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  shareButtonDisabled: {
    opacity: 0.5,
  },
  shareButtonText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  shareButtonTextDisabled: {
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 16,
    color: '#333',
    minHeight: 100,
  },
  mediaPreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  mediaButton: {
    backgroundColor: '#f0f7ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  mediaButtonText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;