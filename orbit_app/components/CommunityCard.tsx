import React from 'react';
import { StyleSheet, ImageBackground, View, Platform, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { CommunityItem } from '@/constants/types';

const { width } = Dimensions.get('window');
const COMMUNITY_CARD_WIDTH = (width - 10) / 2.5;

interface CommunityCardProps {
    item: CommunityItem;
    onPress?: () => void;
  }
  
  export const CommunityCard = ({ item, onPress }: CommunityCardProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <View style={styles.postCount}>
            <ThemedText style={styles.postCountText}>
              {item.postsPerDay} posts/day
            </ThemedText>
          </View>
          <View>
            <ThemedText style={styles.title}>{item.title}</ThemedText>
            <ThemedText style={styles.location}>{(item.location).toUpperCase()}</ThemedText>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: COMMUNITY_CARD_WIDTH,
    height: COMMUNITY_CARD_WIDTH,
    marginRight: 12,
    borderRadius: 16,
    marginLeft: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  background: {
    flex: 1,
  },
  image: {
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.overlay,
    borderRadius: 16
  },
  postCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  postCountText: {
    color: Colors.light.text.white,
    fontSize: 12,
  },
  title: {
    color: Colors.light.text.white,
    fontSize: 22,
    fontWeight: '200',
  },
  location: {
    color: Colors.light.text.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
});