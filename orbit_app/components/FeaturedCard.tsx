import React from 'react';
import { StyleSheet, ImageBackground, View, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

interface FeaturedCardProps {
  title: string;
  imageUrl: string;
  onPress?: () => void;
}

export const FeaturedCard = ({ title, imageUrl, onPress }: FeaturedCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    paddingRight: 27,
    paddingLeft: 26

  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 12,

  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    borderRadius: 12
  },
  title: {
    color: 'white',
  },
});
