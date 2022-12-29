import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Header, OfferCard } from "../molecules";
import NoData from "../../../helpers/NoData";

const TopDeals = ({ deals = [], navigation }) => {
  return (
    <View style={styles.root}>
      <Header title="Top Deals" />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {deals.length === 0 && <NoData />}
        {deals.map((res, index) => (
          <OfferCard
            key={index}
            onPress={() => navigation.navigate("advertinfo", res)}
            item={res}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TopDeals;

const styles = StyleSheet.create({
  root: { margin: 15 },
});
