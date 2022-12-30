import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, commonStyle, Fonts } from "../../styles";
import CustomText from "./CustomText";

const Logo = ({}) => {
  return (
    <View style={styles.root}>
      <View style={[styles.logo, commonStyle.shadow]}>
        <MaterialCommunityIcons
          name="cash-plus"
          size={35}
          color={Colors.primary.main}
        />
      </View>
      <CustomText
        style={{ marginLeft: 10 }}
        font={Fonts.OpenSans.BoldItalic}
        value="Save"
        type="title"
        color={Colors.primary.light}
      />
      <CustomText
        style={{}}
        font={Fonts.OpenSans.BoldItalic}
        value="Karo"
        type="title"
        color={Colors.primary.light}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginLeft: 15,
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
