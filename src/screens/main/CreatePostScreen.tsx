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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// Logo import
import NewPostLogo from '../../assets/newpost.png';

type CreatePostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreatePost'>;

const CreatePostScreen = () => {
  const navigation = useNavigation<CreatePostScreenNavigationProp>();
  const [postText, setPostText] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const handleAddMedia = () => {
    // TODO: Implement media picker
    console.log('Add media');
  };

  const handlePost = () => {
    // TODO: Implement post creation
    navigation.goBack();
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
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Image 
                source={NewPostLogo} 
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity 
                style={[
                  styles.shareButton,
                  !postText.trim() && styles.shareButtonDisabled
                ]}
                onPress={handlePost}
                disabled={!postText.trim()}
              >
                <Text style={[
                  styles.shareButtonText,
                  !postText.trim() && styles.shareButtonTextDisabled
                ]}>Paylaş</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Icon name="account" size={24} color="#fff" />
            </View>
            <Text style={styles.userName}>Oğulcan Demir</Text>
          </View>

          <TextInput
            style={styles.postInput}
            placeholder="Ne düşünüyorsun?"
            placeholderTextColor="#666"
            multiline
            value={postText}
            onChangeText={setPostText}
          />

          {selectedMedia.length > 0 && (
            <ScrollView 
              horizontal 
              style={styles.mediaPreviewContainer}
              showsHorizontalScrollIndicator={false}
            >
              {selectedMedia.map((media, index) => (
                <View key={index} style={styles.mediaPreview}>
                  <Image source={{ uri: media }} style={styles.mediaPreviewImage} />
                  <TouchableOpacity 
                    style={styles.removeMediaButton}
                    onPress={() => setSelectedMedia(selectedMedia.filter((_, i) => i !== index))}
                  >
                    <Icon name="close-circle" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.mediaButton} onPress={handleAddMedia}>
            <Icon name="image" size={24} color="#1a73e8" />
            <Text style={styles.mediaButtonText}>Fotoğraf/Video</Text>
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogo: {
    width: 100,
    height: 30,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  shareButtonDisabled: {
    backgroundColor: '#ccc',
  },
  shareButtonText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  shareButtonTextDisabled: {
    color: '#999',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  postInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  mediaPreviewContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mediaPreviewImage: {
    width: '100%',
    height: '100%',
  },
  removeMediaButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 15,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  mediaButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1a73e8',
  },
});

export default CreatePostScreen;