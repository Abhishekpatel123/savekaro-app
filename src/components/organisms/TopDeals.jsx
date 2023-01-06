import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { Header, OfferCard } from "../molecules";
import NoData from "../../../helpers/NoData";
import sanityClient from "../../api/sanity";
import { useState } from "react";
import { useSelector } from "react-redux";

const TopDeals = ({ navigation }) => {
  const offers = useSelector((state) => state.offer.offers);

  return (
    <View style={styles.root}>
      <Header title="Top Deals" />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
      >
        {offers?.length === 0 && <NoData />}
        {offers?.map((offer, index) => (
          <OfferCard
            key={index}
            onPress={() => navigation.navigate("offer", offer)}
            shopName={offer.shopkeeper.shopName}
            bannerImageUrl={offer.bannerImageUrl}
            discount={offer.discount}
            logo={offer.logo}
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
