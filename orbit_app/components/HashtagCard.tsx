import React from 'react';
import { StyleSheet, ImageBackground, View, Platform, Dimensions } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { HashtagItem } from '@/constants/types';
import { useColorScheme } from '@/hooks/useColorScheme.web';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 10) / 2.5;

interface HashtagCardProps {
    item: HashtagItem;
    onPress?: () => void;
  }
  
  export const HashtagCard = ({ item, onPress }: HashtagCardProps) => {

    const colorScheme = useColorScheme();

    const dynamicStyles = {
      hashtag: {
        ...styles.hashtag,
        color: Colors[colorScheme ?? 'light'].text.white
      },
      count: {
        ...styles.hashtag,
        color: Colors[colorScheme ?? 'light'].text.white
      }
    };

    
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <ThemedText style={dynamicStyles.hashtag}>#{item.tag}</ThemedText>
          <ThemedText style={dynamicStyles.count}>{item.count}m</ThemedText>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
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
        elevation: 4,
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
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    backgroundColor: Colors.light.overlay,
    alignItems: 'flex-end',
    height: '100%'
  },
  hashtag: {
    color: Colors.light.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: Colors.light.text.white,
    fontSize: 14,
  },
});