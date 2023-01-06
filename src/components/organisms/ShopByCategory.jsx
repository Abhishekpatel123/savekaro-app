import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { Header, CategoryCard } from "../molecules";
import NoData from "../../../helpers/NoData";
import MenuData from "../../../data/MenuData";
import { Colors, commonStyle } from "../../styles";
import { CustomText } from "../atoms";

const ShopByCategory = ({ handleFilterChange }) => {
  const categories = useSelector((state) => state.offer.categories);
 
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 10 }}
    >
      {/* <Header title="Shop by category" /> */}
      <View style={styles.root}>
        {categories?.map(({ _id, color, iconUrl, name }) => (
          <TouchableOpacity
            key={_id}
            onPress={() => handleFilterChange(name)}
            style={[
              styles.categoryBox,
              {
                borderColor: color,
                shadowColor: color,
              },
            ]}
          >
            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                marginRight: 8,
                padding: 3,
                borderRadius: 20,
              }}
            >
              <Image
                source={{
                  // uri: urlFor(icon).url(),
                  uri: iconUrl,
                }}
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  padding: 5,
                  borderRadius: 20,
                }}
              />
            </View>
            <CustomText
              style={{ fontWeight: "700", fontSize: 12 }}
              color={Colors.primary.light}
              value={name}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ShopByCategory;

const styles = StyleSheet.create({
  root: { margin: 15, flexDirection: "row", alignItems: "center" },
  categoryBox: {
    minWidth: 105,
    backgroundColor: Colors.primary.main,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
