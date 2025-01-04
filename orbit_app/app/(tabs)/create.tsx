import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CreateScreen() {
  return (

    <ThemedView style={styles.titleContainer}>
      <ThemedText>Create Screen</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({

  titleContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
});
