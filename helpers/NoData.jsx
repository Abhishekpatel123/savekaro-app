import { View, Text, Image } from "react-native";
import React from "react";

const NoData = ({ text, image }) => {
  return (
    <View
      style={{
        width: 400,
        backgroundColor: "#333",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/nodata.png")}
        style={{ height: 200, width: 200 }}
      />
      {/* //   <View style={{ marginLeft: 10 }}>
    //     <Text style={{ fontWeight: "bold", fontSize: 23 }}>No</Text>
    //     <Text style={{ fontWeight: "bold", fontSize: 23 }}>{text}</Text>
    //   </View> */}
    </View>
  );
};

export default NoData;
