import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
const SearchInput = () => {
  return (
    <View style={styles.root}>
      <EvilIcons
        style={styles.searchIcon}
        name="search"
        size={24}
        color="grey"
      />
      <TextInput
        placeholderTextColor="grey"
        placeholder="Search for a store"
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingVertical: 10,
  },
  input: {
    color: "grey",
  },
  searchIcon: {
    marginRight: 5,
  },
});

export default SearchInput;
