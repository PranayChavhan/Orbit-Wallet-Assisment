import React from 'react';
import { StyleSheet, TextInput, View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={20} color={Colors.light.text.secondary} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={Colors.light.text.secondary}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginLeft: 28,
    marginRight: 28,
    marginVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 45,
    height: 48,
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
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.light.text.primary,
    ...Platform.select({
      ios: {
        paddingVertical: 12,
      },
      android: {
        paddingVertical: 8,
      },
    }),
  },
});