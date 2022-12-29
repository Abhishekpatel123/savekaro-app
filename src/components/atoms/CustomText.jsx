import { StyleSheet, Text, View } from "react-native";
import React from "react";

const customStyle = (type) => {
  if (type === "title") {
    return styles.title;
  }
};

const CustomText = ({
  value = "Custom Text",
  type = "normal",
  color,
  font,
  style = null,
}) => {
  return (
    <View>
      <Text
        style={[
          styles.text,
          customStyle(type),
          {
            color: color ? color : "#EFF3F7",
            fontFamily: font ? font : "Regular",
          },
          style,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.5,
    fontSize: 11,
    fontWeight: "800",
  },
  title: {
    fontSize: 21,
  },
});
