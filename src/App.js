import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './store';
import { colors } from './theme/colors';

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import HomeScreen from './screens/main/HomeScreen';
import PostDetailScreen from './screens/main/PostDetailScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import ProjectDetailScreen from './screens/main/ProjectDetailScreen';
import CreatePostScreen from './screens/main/CreatePostScreen';
import CreateProjectScreen from './screens/main/CreateProjectScreen';
import SearchScreen from './screens/main/SearchScreen';
import NotificationsScreen from './screens/main/NotificationsScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import ProjectsScreen from './screens/main/ProjectsScreen';
import SocialScreen from './screens/main/SocialScreen';

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
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.text.primary,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen}
              options={{ 
                title: 'Kayıt Ol',
                headerBackTitle: 'Geri'
              }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ProjectDetail" 
              component={ProjectDetailScreen}
              options={{ 
                title: 'Proje Detayı',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="PostDetail" 
              component={PostDetailScreen}
              options={{ 
                title: 'Gönderi Detayı',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="CreatePost" 
              component={CreatePostScreen}
              options={{ 
                title: 'Gönderi Oluştur',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="CreateProject" 
              component={CreateProjectScreen}
              options={{ 
                title: 'Proje Oluştur',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="Search" 
              component={SearchScreen}
              options={{ 
                title: 'Ara',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
              options={{ 
                title: 'Bildirimler',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ 
                title: 'Profil',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
              options={{ 
                title: 'Profili Düzenle',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="Projects" 
              component={ProjectsScreen}
              options={{ 
                title: 'Projeler',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
            <Stack.Screen 
              name="Social" 
              component={SocialScreen}
              options={{ 
                title: 'Sosyal',
                headerBackTitle: 'Geri',
                headerShown: true
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App; 