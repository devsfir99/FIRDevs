import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { mockUsers, mockPosts } from '../../services/mockData';
import BackspaceLogo from '../../assets/backspace.png';

// Logo import
import Logo from '../../assets/logo.png';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'posts' | 'hashtags'>('users');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = mockPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hashtags = mockPosts
    .map(post => {
      const matches = post.content.match(/#\w+/g);
      return matches || [];
    })
    .flat()
    .filter((tag, index, self) => self.indexOf(tag) === index)
    .filter(tag =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderUser = (user: typeof mockUsers[0]) => (
    <TouchableOpacity
      key={user.id}
      style={styles.resultItem}
      onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
    >
      <View style={styles.avatar}>
        <Icon name="account" size={24} color="#fff" />
      </View>
      <Text style={styles.userName}>{user.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = (post: typeof mockPosts[0]) => (
    <TouchableOpacity
      key={post.id}
      style={styles.resultItem}
      onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
    >
      <View style={styles.postPreview}>
        <Text style={styles.postContent} numberOfLines={2}>
          {post.content}
        </Text>
        <Text style={styles.postMeta}>
          {post.user.name} • {post.timestamp}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHashtag = (tag: string) => (
    <TouchableOpacity
      key={tag}
      style={styles.resultItem}
      onPress={() => {
        // TODO: Navigate to hashtag results
        console.log('Navigate to hashtag:', tag);
      }}
    >
      <Icon name="pound" size={24} color="#1a73e8" />
      <Text style={styles.hashtagText}>{tag}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={Logo} 
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Image 
              source={require('../../assets/search.png')} 
              style={styles.iconStyle}
              resizeMode="contain"
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Ara..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
              >
                <Image 
                  source={BackspaceLogo} 
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
            Kullanıcılar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>
            Gönderiler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'hashtags' && styles.activeTab]}
          onPress={() => setActiveTab('hashtags')}
        >
          <Text style={[styles.tabText, activeTab === 'hashtags' && styles.activeTabText]}>
            Hashtagler
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'users' && (
          searchQuery.length > 0 ? (
            filteredUsers.map(renderUser)
          ) : (
            <Text style={styles.placeholder}>Kullanıcı aramak için yazın</Text>
          )
        )}
        {activeTab === 'posts' && (
          searchQuery.length > 0 ? (
            filteredPosts.map(renderPost)
          ) : (
            <Text style={styles.placeholder}>Gönderi aramak için yazın</Text>
          )
        )}
        {activeTab === 'hashtags' && (
          searchQuery.length > 0 ? (
            hashtags.map(renderHashtag)
          ) : (
            <Text style={styles.placeholder}>Hashtag aramak için yazın</Text>
          )
        )}
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginLeft: 20,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 5,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1a73e8',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  postPreview: {
    flex: 1,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  postMeta: {
    fontSize: 12,
    color: '#666',
  },
  hashtagText: {
    fontSize: 16,
    color: '#1a73e8',
    marginLeft: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});

export default SearchScreen; 