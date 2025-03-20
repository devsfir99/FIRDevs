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
import { launchImageLibrary } from 'react-native-image-picker';

type CreateProjectScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateProject'>;

const CreateProjectScreen = () => {
  const navigation = useNavigation<CreateProjectScreenNavigationProp>();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTechnology, setProjectTechnology] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCreateProject = () => {
    // TODO: Implement project creation logic
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Yeni Proje</Text>
            <View style={styles.placeholder} />
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <TouchableOpacity 
              style={styles.imagePickerButton} 
              onPress={handleImagePick}
            >
              {selectedImage ? (
                <Image 
                  source={{ uri: selectedImage }} 
                  style={styles.selectedImage}
                />
              ) : (
                <>
                  <Icon name="image-plus" size={40} color="#1a73e8" />
                  <Text style={styles.imagePickerText}>Proje Görseli Ekle</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Icon name="format-title" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Proje Adı"
                value={projectName}
                onChangeText={setProjectName}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="code-tags" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Kullanılan Teknoloji (örn: React Native)"
                value={projectTechnology}
                onChangeText={setProjectTechnology}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.descriptionContainer}>
              <Icon name="text" size={24} color="#1a73e8" />
              <TextInput
                style={styles.descriptionInput}
                placeholder="Proje Açıklaması"
                value={projectDescription}
                onChangeText={setProjectDescription}
                multiline
                numberOfLines={4}
                placeholderTextColor="#666"
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              style={[
                styles.createButton,
                (!projectName || !projectDescription) && styles.createButtonDisabled
              ]}
              onPress={handleCreateProject}
              disabled={!projectName || !projectDescription}
            >
              <Icon name="plus-circle" size={24} color="#fff" />
              <Text style={styles.createButtonText}>Proje Oluştur</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  imagePickerButton: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#1a73e8',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePickerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1a73e8',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
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
  input: {
    flex: 1,
    paddingVertical: 15,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  descriptionContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
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
  descriptionInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    height: 100,
  },
  createButton: {
    backgroundColor: '#1a73e8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
    shadowColor: '#999',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default CreateProjectScreen; 