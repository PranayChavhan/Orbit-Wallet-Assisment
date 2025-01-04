import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { NomadProfileType } from '@/constants/types';

interface NomadProfileProps {
    profile: NomadProfileType;
    onPress?: () => void;
  }
  
  export const NomadProfile = ({ profile, onPress }: NomadProfileProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
      </View>
      <ThemedText style={styles.username}>@{profile.username}</ThemedText>
      <ThemedText style={styles.followers}>
        {(profile.followers / 1000).toFixed(1)}k followers
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 20,
    paddingBottom: 20,
    marginLeft: 10
  },
  avatarContainer: {
    borderRadius: 40,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 14,
    color: Colors.light.text.primary,
    marginTop: 8,
    fontWeight: 600
  },
  followers: {
    fontSize: 10,
    color: Colors.light.text.secondary,
    marginTop: -8,
  },
});
