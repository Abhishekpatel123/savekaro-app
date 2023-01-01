import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../../constants/colors";
// import CustomButtom from "..//helpers/CustomButtom";
import { getDate } from "../../../services/getDate";
import { Fonts } from "../../styles";
import { CustomText, Button } from "../atoms";

const OfferCard = ({ onPress, item }) => {
  // const { image, description, discount, startDate, endDate } = item;
  return (
    <View style={styles.root}>
      <ImageBackground
        source={{ uri: item?.image }}
        borderRadius={18}
        resizeMode="cover"
        style={[styles.header, styles.shadow]}
      >
        <View style={styles.content}>
          <CustomText value="Up to" color="black" />
          <View>
            <CustomText
              value={item?.discount?.slice(0, 2) + "%"}
              color="black"
              type="title"
            />
            <CustomText color="black" value="Cashback" />
          </View>
        </View>
      </ImageBackground>
      {/* - FOOTER */}
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: item?.image }}
            style={{ width: 30, height: 30, marginRight: 6 }}
            borderRadius={15}
            // resizeMode="contain"
          />
          <CustomText value="Amazon.com" font={Fonts.RobotoMono.Thin} />
        </View>
        <Button value="Shop now" onPress={onPress} />
      </View>
    </View>
  );
};

export default OfferCard;

const styles = StyleSheet.create({
  root: {
    marginRight: 20,
    maxWidth: 350,
    minWidth: 270,
  },

  // - HEADER
  header: {
    minHeight: 160,
    flex: 1,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#f1f2f6dd",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignSelf: "center",
    width: 100,
  },

  // - FOOTER
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 10,
    borderColor: "black",
  },

  //- COMMON
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
