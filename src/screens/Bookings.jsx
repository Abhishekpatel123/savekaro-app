import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsApi } from "../store/features/offerSlice";

const Bookings = () => {
  const bookings = useSelector((state) => state.offer.bookings);
  console.log(bookings, "bookings");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookingsApi());
  }, []);
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text>B1zookings</Text>
    </View>
  );
};

export default Bookings;
