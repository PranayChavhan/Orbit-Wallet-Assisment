import { SafeAreaView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SearchBar } from "@/components/SearchBar";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />

      <ThemedView style={styles.titleContainer}>
        <ThemedText>No content found....</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 60,
  },
  titleContainer: {
    height: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparant",
  },
});
