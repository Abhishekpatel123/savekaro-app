import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOfferApi } from "../store/features/offerSlice";
import { Colors } from "../styles";
import { Card, FilterHeader } from "./Bookings";

const Offers = () => {
  const offers = useSelector((state) => state.offer.offers);
  const dispatch = useDispatch();
  console.log(offers, "offers");
  useEffect(() => {
    dispatch(fetchOfferApi());
  }, []);

  const handleFilter = (status) => {
    dispatch(fetchOfferApi(status));
  };

  return (
    <View
      style={{ backgroundColor: Colors.primary.main }}
      className={`flex-1 p-4`}
    >
      <FilterHeader handleClick={handleFilter} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={offers}
        renderItem={({ item }) => <Card offer={item} />}
      />
    </View>
  );
};

export default Offers;
