import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Container = ({ children }) => {
  return <View styles={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default Container;
