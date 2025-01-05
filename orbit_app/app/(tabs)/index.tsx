import React from 'react';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { SearchBar } from '@/components/SearchBar';
import { FeaturedCard } from '@/components/FeaturedCard';
import { HashtagCard } from '@/components/HashtagCard';
import { CommunityCard } from '@/components/CommunityCard';
import { NomadProfile } from '@/components/NomadProfile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme.web';

export default function HomeScreen() {
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


  const renderSectionHeader = (title: string, showAll?: boolean) => (
    <View style={styles.sectionHeader}>
      <ThemedText style={dynamicStyles.heading} type="subtitle">{title}</ThemedText>
      {showAll && (
        <ThemedText darkColor={Colors.dark.primary} lightColor={Colors.light.primary} type="link" onPress={() => {}}>
          See all
        </ThemedText>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedText type="title" style={dynamicStyles.header}>
            Discover the world
          </ThemedText>
          
          <SearchBar />
          
          <FeaturedCard
            title="#Top search of the day"
            imageUrl="https://picsum.photos/400/200"
          />
          
          {renderSectionHeader('Trending hashtags', true)}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            data={[...Array(80)].map((_, i) => ({
              id: i.toString(),
              tag: 'adventure',
              image: `https://picsum.photos/200/200?random=${i}`,
              count: 1.2 + i
            }))}
            renderItem={({ item }) => <HashtagCard item={item} />}
            keyExtractor={item => item.id}
          />
          
          {renderSectionHeader('Top community', true)}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            data={[...Array(80)].map((_, i) => ({
              id: i.toString(),
              title: i % 2 === 0 ? 'Places of' : 'We live in',
              subtitle: '@lifestyle',
              image: `https://picsum.photos/300/400?random=${i + 50}`,
              location: i % 2 === 0 ? 'France' : 'Italy',
              postsPerDay: 5 + i
            }))}
            renderItem={({ item }) => <CommunityCard item={item} />}
            keyExtractor={item => item.id}
          />
          
          {renderSectionHeader('Top nomads', true)}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            data={[...Array(20)].map((_, i) => ({
              id: i.toString(),
              username: `user${i}`,
              avatar: `https://picsum.photos/100/100?random=${i + 20}`,
              followers: Math.floor(Math.random() * 10000) // Adding followers property
            }))}
            renderItem={({ item }) => <NomadProfile profile={item} />}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 15
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 30,
    color: Colors.light.primary,
    marginLeft: 30
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 16,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  heading: {
    color: Colors.light.primary,
    fontSize: 24
  }
});