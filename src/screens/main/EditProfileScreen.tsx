import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const [fullName, setFullName] = useState('Oğulcan Demir');
  const [email] = useState('240541016@firat.edu.tr');
  const [bio, setBio] = useState('React Native Developer | FIRDevs Member');
  const [skills, setSkills] = useState(['React Native', 'JavaScript', 'TypeScript']);
  const [newSkill, setNewSkill] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    // TODO: Implement save logic
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
            <Text style={styles.headerTitle}>Profili Düzenle</Text>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Icon name="check" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="account" size={40} color="#fff" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Icon name="camera" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kişisel Bilgiler</Text>
            <View style={styles.inputContainer}>
              <Icon name="account" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Ad Soyad"
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="email" size={24} color="#1a73e8" />
              <TextInput
                style={[styles.input, { color: '#666' }]}
                value={email}
                editable={false}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="text" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Hakkında"
                value={bio}
                onChangeText={setBio}
                multiline
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yetkinlikler</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillItem}>
                  <Text style={styles.skillText}>{skill}</Text>
                  <TouchableOpacity
                    style={styles.removeSkillButton}
                    onPress={() => handleRemoveSkill(skill)}
                  >
                    <Icon name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addSkillContainer}>
              <TextInput
                style={styles.addSkillInput}
                placeholder="Yeni yetkinlik ekle"
                value={newSkill}
                onChangeText={setNewSkill}
                placeholderTextColor="#666"
              />
              <TouchableOpacity 
                style={styles.addSkillButton}
                onPress={handleAddSkill}
              >
                <Icon name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sosyal Medya</Text>
            <View style={styles.inputContainer}>
              <Icon name="github" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="GitHub Kullanıcı Adı"
                value={github}
                onChangeText={setGithub}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="linkedin" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="LinkedIn Profil URL"
                value={linkedin}
                onChangeText={setLinkedin}
                placeholderTextColor="#666"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="twitter" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Twitter Kullanıcı Adı"
                value={twitter}
                onChangeText={setTwitter}
                placeholderTextColor="#666"
              />
            </View>
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
  saveButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#1a73e8',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#fff',
    marginRight: 5,
  },
  removeSkillButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addSkillInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  addSkillButton: {
    backgroundColor: '#1a73e8',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a73e8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default EditProfileScreen;