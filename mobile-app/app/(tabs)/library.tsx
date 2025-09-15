import { StyleSheet, FlatList } from "react-native";
import { Text, View } from "@/components/Themed";
import LibraryEntry from "@/components/LibraryEntry";

export default function Library() {
  const example = {
    name: "One Piece",
    rating: 9,
  };
  return (
    <View style={styles.background}>
      <View>
        <Text>Sort</Text>
      </View>
      <FlatList
        style={styles.container}
        data={[example]}
        renderItem={({ item }) => <LibraryEntry entry={item} />}
        numColumns={1}
      />
      <Text>{}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
});
