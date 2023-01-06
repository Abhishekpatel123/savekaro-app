import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors, Fonts } from "../../styles";

const Button = ({ value = "Button", onPress, color = "white" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.root, styles.shadow, { backgroundColor: color }]}
    >
      <Text
        style={{ fontSize: 14, fontWeight: "bold", color: Colors.primary.main }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 8,
    backgroundColor: Colors.background,
    paddingVertical: 6,
    minHeight: 32,
    paddingHorizontal: 15,
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-start",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default Button;
