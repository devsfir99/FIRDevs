import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import ProjectsScreen from '../screens/main/ProjectsScreen';
import SocialScreen from '../screens/main/SocialScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import CreateProjectScreen from '../screens/main/CreateProjectScreen';
import ProjectDetailScreen from '../screens/main/ProjectDetailScreen';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import CreatePostScreen from '../screens/main/CreatePostScreen';
import PostDetailScreen from '../screens/main/PostDetailScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import SearchScreen from '../screens/main/SearchScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Social" component={SocialScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;