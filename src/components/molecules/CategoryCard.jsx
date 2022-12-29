import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import CustomButtom from "..//helpers/CustomButtom";
import { getDate } from "../../../services/getDate";
import { Colors, Fonts } from "../../styles";
import { CustomText, Button } from "../atoms";

const CategoryCard = ({ onPress, item }) => {
  // const { image, description, discount, startDate, endDate } = item;
  return (
    <View style={styles.root}>
      <ImageBackground
        source={{ uri: item?.image }}
        borderRadius={25}
        resizeMode="cover"
        style={[styles.header, styles.shadow]}
      ></ImageBackground>
      {/* - FOOTER */}
      <View style={styles.footer}>
        <CustomText
          value="Amazon.com"
          color={Colors.primary.light}
          font={Fonts.RobotoMono.Regular}
        />
      </View>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  root: {
    marginRight: 20,
    maxWidth: 350,
    minWidth: 130,
  },

  // - HEADER
  header: {
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
  },

  // - FOOTER
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 5,
    marginTop: 10,
    borderColor: "black",
  },

  // - COMMON
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
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 5,
  },
});
