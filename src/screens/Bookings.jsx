import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cancelBookingsApi,
  fetchBookingsApi,
} from "../store/features/offerSlice";
import { Colors } from "../styles";
import { OfferCard } from "../components/molecules";
import { getDate } from "../../services/getDate";
import { STATUS } from "../constants";

const Bookings = () => {
  const { bookings, alert } = useSelector((state) => state.offer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookingsApi());
  }, []);

  useEffect(() => {
    console.log(alert, "alert");
    if (alert?.type === STATUS.error) {
    }
  }, [alert]);
  const handleCancel = (offerId) => {
    dispatch(cancelBookingsApi({ offerId }));
  };

  const handleFilter = (status) => {
    dispatch(fetchBookingsApi(status));
  };

  console.log(bookings, "bookings");
  return (
    <View
      style={{ backgroundColor: Colors.primary.main }}
      className={`flex-1 p-4`}
    >
      <FilterHeader handleClick={handleFilter} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={bookings}
        renderItem={({ item: { offer, status } }) => (
          <Card
            offer={offer}
            status={status}
            handleCancelOffer={handleCancel}
          />
        )}
      />
    </View>
  );
};

export default Bookings;

export const FilterHeader = ({ handleClick }) => {
  // /* // Overall Pending, Completed, Cancel */
  return (
    <View className="mb-4 flex-row gap-2 items-center">
      {[
        { id: "", label: "Overall" },
        { id: "PENDING", label: "Pending" },
        { id: "COMPLETED", label: "Completed" },
        { id: "CANCELED", label: "Canceled" },
      ].map(({ id, label }) => (
        <TouchableOpacity
          key={id + "status"}
          className="bg-zinc-800 px-4 py-3 rounded-2xl shadow-2xl"
          onPress={() => handleClick(id)}
        >
          <Text className="text-gray-50 font-thin">{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const Card = ({ offer, status, handleCancelOffer }) => {
  return (
    <View className={`mb-4`}>
      <OfferCard
        bannerImageUrl={offer.bannerImageUrl}
        discount={offer.discount}
        shopName={offer?.shopkeeper?.shopName}
        logo={offer.logo}
      />
      <View className="flex-row justify-between items-center">
        <View className={`mt-4 ml-2`}>
          <Text className="text-sky-300 font-bold text-center">{status}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCancelOffer(offer._id)}
          className={`bg-red-200 px-2 py-2 rounded-l w-24 mt-4 ml-2`}
        >
          <Text className="text-red-600 font-bold text-center">Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-white mt-3">{getDate(offer.expiryDate)}</Text>
    </View>
  );
};
