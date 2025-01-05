// screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  TouchableOpacity, 
  Platform,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';

const PROFILE_IMAGE_KEY = 'profile_image';
const { width } = Dimensions.get('window');
const GRID_IMAGE_SIZE = (width - 48) / 3;

interface ProfileData {
  name: string;
  bio: string;
  photos: number;
  followers: number;
  following: number;
  posts: Array<{
    id: string;
    image: string;
  }>;
}

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileData] = useState<ProfileData>({
    name: 'Pranay Chavhan',
    bio: 'Full stack developer | Aiming for excellenxe',
    photos: 1670,
    followers: 14500,
    following: 664,
    posts: Array(90).fill(0).map((_, i) => ({
      id: i.toString(),
      image: `https://picsum.photos/300/300?random=${i}`,
    }))
  });

  useEffect(() => {
    loadProfileImage();
    requestPermissions();
    setProfileImage('https://picsum.photos/300/300');
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0].uri;
        setProfileImage(selectedImage);
        await AsyncStorage.setItem(PROFILE_IMAGE_KEY, selectedImage);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={pickImage} style={styles.profileImageContainer}>
              <Image
                source={profileImage ? { uri: profileImage } : require('@/assets/images/profile.jpg')}
                style={styles.profileImage}
              />
              <View style={styles.editBadge}>
                <Feather name="camera" size={12} color="white" />
              </View>
            </TouchableOpacity>

            <ThemedText style={styles.name}>{profileData.name}</ThemedText>
            <ThemedText style={styles.bio}>{profileData.bio}</ThemedText>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>
                  {formatNumber(profileData.photos)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Photos</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>
                  {formatNumber(profileData.followers)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Followers</ThemedText>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <ThemedText style={styles.statNumber}>
                  {formatNumber(profileData.following)}
                </ThemedText>
                <ThemedText style={styles.statLabel}>Following</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.postsGrid}>
            {profileData.posts.map((post) => (
              <Image
                key={post.id}
                source={{ uri: post.image }}
                style={styles.gridImage}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  editBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0a7ea4',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
    marginHorizontal: 20,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    marginTop: 20,
    marginLeft: 8
  },
  gridImage: {
    width: GRID_IMAGE_SIZE,
    height: GRID_IMAGE_SIZE,
    margin: 4,
    borderRadius: 8,
  },
});