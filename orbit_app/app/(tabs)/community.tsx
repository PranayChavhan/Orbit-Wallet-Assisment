import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const SPACING = 10;
const IMAGE_WIDTH = (SCREEN_WIDTH - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;

const NUM_IMAGES = 500;
const images = Array.from({ length: NUM_IMAGES }, (_, i) => ({
  id: i.toString(),
  url: `https://picsum.photos/300/400?random=${i}`,
}));

export default function CommunityScreen() {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const renderItem = ({ item }: { item: { id: string; url: string } }) => (
    <View style={styles.imageContainer}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#666" />
        </View>
      )}
      <Image
        source={{ uri: item.url }}
        style={styles.image}
        resizeMode="cover"
        onLoad={handleImageLoad}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={COLUMN_COUNT}
          contentContainerStyle={styles.feedContainer}
          showsVerticalScrollIndicator={false}
        />
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
    top: 50
  },
  searchBar: {
    height: 40,
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
  },
  feedContainer: {
    paddingHorizontal: SPACING,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    margin: SPACING / 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});
