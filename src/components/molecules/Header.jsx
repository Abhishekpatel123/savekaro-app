import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import { CustomText } from "../atoms";
import { Colors, Fonts } from "../../styles";

const Header = ({ title }) => {
  return (
    <View style={styles.root}>
      <CustomText
        color={Colors.primary.light}
        value={title}
        type="title"
        font={Fonts.RobotoMono.Regular}
      />
      <TouchableOpacity>
        <CustomText
          color={Colors.primary.light}
          value="Sell all"
          font={Fonts.RobotoMono.Thin}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});
