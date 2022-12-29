import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { Header, CategoryCard } from "../molecules";
import NoData from "../../../helpers/NoData";

const AllShops = ({ deals, navigation }) => {
  return (
    <View style={styles.root}>
      <Header title="All shops" />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {deals.length === 0 && <NoData />}
        {deals.map((res, index) => (
          <CategoryCard
            key={index}
            onPress={() => navigation.navigate("advertinfo", res)}
            item={res}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AllShops;

const styles = StyleSheet.create({
  root: { margin: 15 },
});
