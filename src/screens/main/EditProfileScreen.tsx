import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import authService from '../../services/authService';
import { User } from '../../types/auth';

type EditProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  
  // Profil verileri için state'ler
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [fakulte, setFakulte] = useState('');
  const [bolum, setBolum] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');

  // Kullanıcı profilini yükle
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        
        // Mevcut kullanıcıyı al
        const userData = await authService.getCurrentUser();
        
        if (!userData) {
          // Kullanıcı bulunamadıysa profil bilgilerini getir
          const profile = await authService.getProfile();
          if (profile) {
            setUserData(profile);
          }
        } else {
          setUserData(userData);
        }
      } catch (error) {
        console.error('Profil yükleme hatası:', error);
        Alert.alert('Hata', 'Profil bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  // Kullanıcı verilerini form alanlarına yerleştir
  const setUserData = (user: User) => {
    // Ad ve soyad birleştirilerek gösterilir
    setFullName(`${user.ad} ${user.soyad}`);
    setEmail(user.email);
    setFakulte(user.fakulte || '');
    setBolum(user.bolum || '');
    setBio(user.bio || '');
    
    // Yetkinlikler
    if (user.skills && Array.isArray(user.skills)) {
      setSkills(user.skills);
    }
    
    // Sosyal medya
    if (user.socialMedia) {
      setGithub(user.socialMedia.github || '');
      setLinkedin(user.socialMedia.linkedin || '');
      setTwitter(user.socialMedia.twitter || '');
      setInstagram(user.socialMedia.instagram || '');
    }
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter' && newSkill) {
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const validateSocialMediaUrls = (urls: {
    github?: string,
    linkedin?: string,
    twitter?: string,
    instagram?: string
  }) => {
    const validatedUrls: typeof urls = {};
    
    // GitHub formatı: kullanıcı adı veya https://github.com/kullanıcı-adı
    if (urls.github) {
      validatedUrls.github = urls.github.startsWith('http') ? urls.github : urls.github;
    }
    
    // LinkedIn formatı: kullanıcı adı veya https://linkedin.com/in/kullanıcı-adı
    if (urls.linkedin) {
      validatedUrls.linkedin = urls.linkedin.startsWith('http') ? urls.linkedin : urls.linkedin;
    }
    
    // Twitter formatı: kullanıcı adı veya https://twitter.com/kullanıcı-adı
    if (urls.twitter) {
      validatedUrls.twitter = urls.twitter.startsWith('http') ? urls.twitter : urls.twitter;
    }
    
    // Instagram formatı: kullanıcı adı veya https://instagram.com/kullanıcı-adı
    if (urls.instagram) {
      validatedUrls.instagram = urls.instagram.startsWith('http') ? urls.instagram : urls.instagram;
    }
    
    return validatedUrls;
  };

  const handleSave = async () => {
    try {
      if (!fullName.trim()) {
        Alert.alert('Hata', 'Ad Soyad alanı boş olamaz');
        return;
      }
      
      setSaving(true);
      
      // Ad ve soyadı ayır (ilk boşluğa göre)
      const nameParts = fullName.split(' ');
      const ad = nameParts[0];
      const soyad = nameParts.slice(1).join(' ');
      
      // Sosyal medya URL'lerini kontrol et
      const validatedSocialMedia = validateSocialMediaUrls({
        github,
        linkedin,
        twitter,
        instagram
      });
      
      // Profil güncellemesi için verileri hazırla
      const profileData = {
        ad,
        soyad,
        fakulte: fakulte.trim(),
        bolum: bolum.trim(),
        bio: bio.trim(),
        skills: skills.filter(skill => skill.trim() !== ''),
        socialMedia: validatedSocialMedia
      };
      
      console.log('Profil güncelleme verileri:', JSON.stringify(profileData, null, 2));
      console.log('- fakulte:', profileData.fakulte);
      console.log('- bolum:', profileData.bolum);
      console.log('- bio:', profileData.bio);
      console.log('- skills:', profileData.skills);
      console.log('- socialMedia:', JSON.stringify(profileData.socialMedia, null, 2));
      
      // Profili güncelle
      const updatedUser = await authService.updateProfile(profileData);
      
      console.log('Güncellenmiş kullanıcı verileri:');
      console.log('- _id:', updatedUser?._id);
      console.log('- ad:', updatedUser?.ad);
      console.log('- soyad:', updatedUser?.soyad);
      console.log('- fakulte:', updatedUser?.fakulte || 'boş');
      console.log('- bolum:', updatedUser?.bolum || 'boş');
      console.log('- bio:', updatedUser?.bio || 'boş');
      console.log('- skills:', updatedUser?.skills ? JSON.stringify(updatedUser.skills) : 'boş');
      console.log('- socialMedia:', updatedUser?.socialMedia ? JSON.stringify(updatedUser.socialMedia) : 'boş');
      
      // Güncelleme başarılı mı kontrol et
      const isSuccess = updatedUser && 
        (profileData.fakulte === updatedUser?.fakulte) &&
        (profileData.bolum === updatedUser?.bolum) &&
        (profileData.bio === updatedUser?.bio);
      
      if (!isSuccess) {
        console.error('Profil güncellemesi kısmen başarılı oldu, bazı alanlar güncellenmemiş olabilir.');
      }
        
      Alert.alert(
        'Başarılı', 
        'Profil bilgileriniz güncellendi' + 
        (isSuccess ? '' : ' (Bazı alanlar güncellenememiş olabilir)'),
        [
          {
            text: 'Tamam',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      Alert.alert('Hata', 'Profil bilgileri güncellenirken bir hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  // Yükleme durumu
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
          <Text style={styles.loadingText}>Profil bilgileri yükleniyor...</Text>
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
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profili Düzenle</Text>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Icon name="check" size={24} color="#fff" />
              )}
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
              <Icon name="school" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Fakülte"
                value={fakulte}
                onChangeText={setFakulte}
                placeholderTextColor="#666"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="book-open-variant" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Bölüm"
                value={bolum}
                onChangeText={setBolum}
                placeholderTextColor="#666"
                autoCapitalize="none"
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
                autoCapitalize="none"
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
                onKeyPress={handleKeyPress}
                placeholderTextColor="#666"
                returnKeyType="done"
                onSubmitEditing={handleAddSkill}
                autoCapitalize="none"
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
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="linkedin" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="LinkedIn Kullanıcı Adı"
                value={linkedin}
                onChangeText={setLinkedin}
                placeholderTextColor="#666"
                autoCapitalize="none"
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
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon name="instagram" size={24} color="#1a73e8" />
              <TextInput
                style={styles.input}
                placeholder="Instagram Kullanıcı Adı"
                value={instagram}
                onChangeText={setInstagram}
                placeholderTextColor="#666"
                autoCapitalize="none"
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
    right: 0,
    backgroundColor: '#1a73e8',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    color: '#fff',
    marginRight: 5,
  },
  removeSkillButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  addSkillInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#333',
  },
  addSkillButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1a73e8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default EditProfileScreen;