import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import { Button, CustomText } from "../atoms";
import { Colors, Fonts } from "../../styles";
const LocationAlert = ({ onPress }) => {
  return (
    <View style={[styles.root, styles.shadow]}>
      <TouchableOpacity style={styles.cancelButton}>
        <Entypo name="cross" size={18} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
        <View>
          <CustomText
            value="Location permission"
            font={Fonts.RobotoMono.Bold}
            color={Colors.white}
            style={{ fontSize: 17, letterSpacing: 0.1 }}
          />
          <CustomText
            value="is missing"
            font={Fonts.RobotoMono.Bold}
            color={Colors.white}
            style={{ fontSize: 17, marginBottom: 10 }}
          />
          <Button value="Allow location" onPress={onPress} />
        </View>
        <Image
          source={{
            uri: "https://img.icons8.com/3d-fluency/94/null/map-marker--v1.png",
          }}
          style={{
            width: 50,
            height: 50,
            alignSelf: "center",
            marginRight: 20,
          }}
        />
      </View>
    </View>
  );
};

export default LocationAlert;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.info,
    borderRadius: 15,
    minHeight: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 15,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cancelButton: {
    position: "absolute",
    top: 6,
    right: 8,
    padding: 3,
    backgroundColor: "#3333",
    borderRadius: 50,
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
