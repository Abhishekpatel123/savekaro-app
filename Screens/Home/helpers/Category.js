import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";

import MenuData from "../../../data/MenuData";

const RowCategory = ({ handleFilterChange }) => {
  return (
    <View style={styles.categoryBoxContainer}>
      {MenuData.map(({ title, subTitle, background, icon }, index) => (
        <ScrollView key={index}>
          <TouchableOpacity
            onPress={() => handleFilterChange(title)}
            style={styles.categoryBox}
          >
            <ImageBackground source={background} style={{ width: 100 }}>
              <View style={{ padding: 20 }}>
                <Image
                  source={icon}
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 20,
                  }}
                />
              </View>
            </ImageBackground>
            <Text style={{ fontWeight: "700" }}>{title}</Text>
            <Text style={{ fontWeight: "700" }}>{subTitle}</Text>
          </TouchableOpacity>
        </ScrollView>
      ))}
    </View>
  );
};

export const CategoryModel = ({ isFilter, handleFilterChange }) =>
  isFilter ? (
    <View style={styles.rootCategoryModel}>
      <View style={styles.categoryModel}>
        {MenuData.map(({ title }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleFilterChange(title)}
            style={styles.categoryModelList}
          >
            <Text style={{ fontWeight: "800" }}>{title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ) : null;

export default RowCategory;

const styles = StyleSheet.create({
  categoryBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryBox: {
    flexDirection: "column",
    alignItems: "center",
  },

  // model
  rootCategoryModel: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryModel: {
    width: 200,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  categoryModelList: {
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "center",
    borderBottomWidth: 0.5,
  },
});
