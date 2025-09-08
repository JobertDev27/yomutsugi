import { View, Text } from "./Themed";
import { StyleSheet, Image } from "react-native";

interface props {
  entry: {
    name: string;
    rating: number;
  };
}

export default function LibraryEntry({ entry }: props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/temp.jpg")}
        />
      </View>
      <View style={styles.metadata}>
        <Text>{entry.name}</Text>
        <Text>{entry.rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  imageContainer: {
    width: "100%",
    height: 256,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  metadata: {},
});
