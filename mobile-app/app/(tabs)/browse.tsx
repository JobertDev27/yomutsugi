import { StyleSheet, TextInput, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export default function Browse() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Anime", value: "ANIME" },
    { label: "Manga", value: "MANGA" },
    { label: "Novel", value: "NOVEL" },
  ]);
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    searchBar: {
      padding: 10,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    inputField: {
      backgroundColor: Colors[colorScheme ?? "light"].text,
      width: "60%",
      borderRadius: 10,
    },
    dropdown: {
      width: 120,
      borderRadius: 10,
      backgroundColor: Colors[colorScheme ?? "light"].text,
      color: Colors[colorScheme ?? "light"].background,
    },
  });

  return (
    <View style={styles.background}>
      <View style={styles.searchBar}>
        <TextInput style={styles.inputField} placeholder="Search" />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          style={styles.dropdown}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{
            width: 120,
            borderRadius: 10,
          }}
          dropDownContainerStyle={{
            backgroundColor: Colors[colorScheme ?? "light"].text,
          }}
          selectedItemContainerStyle={{
            backgroundColor: Colors[colorScheme ?? "light"].tint,
          }}
          placeholder="Media Type"
        />
      </View>
    </View>
  );
}
