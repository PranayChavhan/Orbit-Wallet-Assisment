import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  View,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';

export default function CreateScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const colorScheme = useColorScheme();

  const dynamicStyles = {
    header: {
      ...styles.header,
      color: Colors[colorScheme ?? 'light'].primary
    },
    heading: {
      fontSize: 24,
      color: Colors[colorScheme ?? 'light'].primary
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handlePost = () => {
    if (!image) {
      Alert.alert('Please select an image');
      return;
    }
    Alert.alert('Success', 'Post created!');
    setImage(null);
    setCaption('');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <ThemedText type="title" style={dynamicStyles.header}>
            Create Post
          </ThemedText>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Image Picker */}
            <TouchableOpacity 
              style={[styles.imagePicker, image && styles.imagePickerWithImage]} 
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.selectedImage} />
              ) : (
                <>
                  <View style={styles.iconContainer}>
                    <Ionicons name="image" size={40} color="#666" />
                  </View>
                  <ThemedText style={styles.pickImageText}>Add Photo</ThemedText>
                </>
              )}
            </TouchableOpacity>

            {/* Caption Input */}
            <View style={styles.captionContainer}>
              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                value={caption}
                onChangeText={setCaption}
                multiline
                maxLength={2200}
                placeholderTextColor="#666"
              />
            </View>
          </View>

          {/* Footer with Post Button */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.postButton, !image && styles.postButtonDisabled]}
              onPress={handlePost}
              disabled={!image}
            >
              <ThemedText style={styles.postButtonText}>Post</ThemedText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    top: 20
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    fontSize: 28
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  imagePicker: {
    width: 280,
    height: 280,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowRadius: 4,
    elevation: 1,
  },
  imagePickerWithImage: {
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  pickImageText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  captionContainer: {
    width: '100%',
    marginTop: 20,
  },
  captionInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 50,
  },
  postButton: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#ccc',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});