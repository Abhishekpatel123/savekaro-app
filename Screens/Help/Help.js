import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButtom from "../../helpers/CustomButtom";
import logo from "../../icons/helpss.png";

const Help = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center" }}>
        <Image source={logo} style={{ width: 350, height: 300 }} />
        <CustomButtom name="Help" style={{ width: 200 }} />
      </View>
    </SafeAreaView>
  );
};

export default Help;
