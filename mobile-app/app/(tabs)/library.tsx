import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "@/components/Themed";
import LibraryEntry from "@/components/LibraryEntry";

export default function Library() {
  const example = {
    name: "one piece",
    rating: 10,
  };
  return (
    <FlatList
      style={styles.container}
      data={[example, example, example]}
      renderItem={({ item }) => <LibraryEntry entry={item} />}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
