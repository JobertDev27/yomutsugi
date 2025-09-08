import Colors from "@/constants/Colors";
import { View, Text } from "./Themed";
import { StyleSheet, Image, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface props {
  entry: {
    name: string;
    rating: number;
  };
}

export default function LibraryEntry({ entry }: props) {
  const colorScheme = useColorScheme();

  const ratingToStar = (rating: number) => {
    const emptyStar = 10 - rating;
    return (
      <View style={styles.starContainer}>
        <Text>
          {Array.from({ length: rating }).map((_, i) => (
            <FontAwesome
              key={i}
              size={16}
              name="star"
              color={Colors[colorScheme ?? "light"].tint}
            />
          ))}
        </Text>
        <Text>
          {Array.from({ length: emptyStar }).map((_, i) => (
            <FontAwesome
              key={i}
              size={16}
              name="star-o"
              color={Colors[colorScheme ?? "light"].tint}
            />
          ))}
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: Colors[colorScheme ?? "light"].tint,
      borderTopRightRadius: 25,
      borderBottomEndRadius: 25,
    },

    imageContainer: {
      width: 70,
      height: 100,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    metadata: {
      margin: 10,
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 500,
    },
    starContainer: {
      flex: 1,
      flexDirection: "row",
    },
    genre: {
      position: "absolute",
      bottom: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/temp.jpg")}
        />
      </View>
      <View style={styles.metadata}>
        <Text style={styles.title}>{entry.name}</Text>
        {ratingToStar(entry.rating)}
        <Text style={styles.genre}>Genre: Shonen, Open world, Fighting</Text>
      </View>
    </View>
  );
}
