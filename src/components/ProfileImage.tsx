import React, { useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProfileImageUrl } from '../utils/imageUtils';

interface ProfileImageProps {
  imageUrl: string | null | undefined;
  size?: number;
  style?: ImageStyle | ViewStyle;
  showPlaceholder?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageUrl,
  size = 40,
  style,
  showPlaceholder = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Profil fotoğrafı URL'sini oluştur
  const fullImageUrl = getProfileImageUrl(imageUrl);

  // Container stil
  const containerStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    ...style,
  };

  // Placeholder stil
  const placeholderStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  };

  // Resim stil
  const imageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  // Yükleme göstergesi stil
  const loadingContainerStyle = {
    ...placeholderStyle,
    backgroundColor: '#f8f9fa',
  };

  if (!fullImageUrl || hasError) {
    if (!showPlaceholder) return null;
    return (
      <View style={[styles.container, placeholderStyle]}>
        <Icon name="account" size={size * 0.6} color="#666" />
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {isLoading && (
        <View style={[styles.loadingContainer, loadingContainerStyle]}>
          <ActivityIndicator size="small" color="#1a73e8" />
        </View>
      )}
      <Image
        source={{ uri: fullImageUrl }}
        style={[styles.image, imageStyle, isLoading && styles.hiddenImage]}
        onLoadStart={() => setIsLoading(true)}
        onLoad={() => setIsLoading(false)}
        onError={(error) => {
          console.error('Profil fotoğrafı yükleme hatası:', error);
          setHasError(true);
          setIsLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    backgroundColor: 'transparent',
  },
  hiddenImage: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileImage; 