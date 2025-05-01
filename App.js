import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import store from './src/store';

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/main/HomeScreen';
import ProjectsScreen from './src/screens/main/ProjectsScreen';
import SocialScreen from './src/screens/main/SocialScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';
import CreateProjectScreen from './src/screens/main/CreateProjectScreen';
import ProjectDetailScreen from './src/screens/main/ProjectDetailScreen';
import EditProfileScreen from './src/screens/main/EditProfileScreen';
import CreatePostScreen from './src/screens/main/CreatePostScreen';
import PostDetailScreen from './src/screens/main/PostDetailScreen';
import NotificationsScreen from './src/screens/main/NotificationsScreen';
import SearchScreen from './src/screens/main/SearchScreen';

// Enable screens for better performance
enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',
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
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;