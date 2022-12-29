import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../constants/colors";
import CustomButtom from "../helpers/CustomButtom";
import { getDate } from "../services/getDate";

const BestOffers = ({ onPress, item }) => {
  // const { image, description, discount, startDate, endDate } = item;
  return (
    <View style={[styles.root, styles.shadow]}>
      <Image
        source={{ uri: item?.image }}
        style={{ minWidth: 210, width: "100%", height: 190, borderRadius: 5 }}
      />
      <View style={styles.outerContent}>
        <View style={styles.content}>
          <Text
            style={{
              fontSize: 12,
              color: "gray",
              flex: 1,
              flexWrap: "wrap",
            }}
            numberOfLines={2}
          >
            {item?.description}
          </Text>
          <View style={[styles.innerContainer, styles.shadow]}>
            <Text style={[styles.offerText, styles.textShadow]}>
              {item?.discount?.slice(0, 2) + "%"}
            </Text>
            <Text style={[styles.offerText, styles.textShadow]}>Off</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={{ fontSize: 12, color: "black" }}>
            {getDate(item?.startDate)}
          </Text>
          <Text style={{ fontSize: 12, color: "black" }}>{getDate(item?.endDate)}</Text>
        </View>
        <CustomButtom
          style={{ marginBottom: 0 }}
          name="View"
          color={Colors.primary}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default BestOffers;

const styles = StyleSheet.create({
  root: {
    // borderRadius: 10,
    flex: 1,
    marginRight: 20,
    maxWidth: 250,
  },
  outerContent: {
    backgroundColor: "#f1f2f6",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // flex: 1,
    flexShrink: 1,
    // flexWrap: "wrap",
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
  timeContainer: {
    paddingHorizontal: 10,
    // paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerContainer: {
    width: 30,
    height: 30,
    // borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  offerText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 5,
  },
});
