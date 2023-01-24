import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import MenuData from "../../data/MenuData";
import filter from "../../icons/edit.png";
import * as Location from "expo-location";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import TopHotels from "../../components/TopHotels";
import BestOffers from "../../components/BestOffers";
import config from "../config";
import NoData from "../../helpers/NoData";
import { getDistance, getPreciseDistance } from "geolib";
import RowCategory, {
  CategoryModel,
} from "../../Screens/Home/helpers/Category";
import { SearchInput, CustomText } from "../components/atoms";
import { Header, LocationAlert, OfferCard } from "../components/molecules";
import { Colors } from "../styles";
import { ALlShops, ShopByCategory, TopDeals } from "../components/organisms";
import {
  setLiveAddress,
  setUser,
  updateUserApi,
} from "../store/features/authSlice";
import axiosInstance from "../api/axiosInstance";
import {
  setOffers,
  setCategories,
  fetchOfferApi,
  fetchShopCategoriesApi,
} from "../store/features/offerSlice";

const Home = ({ navigation }) => {
  const [hotel, setHotel] = useState([]);
  const [advert, setAdvert] = useState([]);
  const [filterAdvert, setFilterAdvert] = useState([]);
  const [filterHotel, setFilterHotel] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isFilter, setfilter] = useState(false);
  const [liveCords, setLiveCords] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: 0.1 });
      if (location) {
        const { latitude, longitude } = location.coords;
        setLiveCords({ latitude, longitude });
        const response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        const liveAddress = {
          city: response[0].city,
          coordinates: {
            lat: latitude,
            lng: longitude,
          },
        };
        // - Update live address to the User DB
        dispatch(updateUserApi({ liveAddress }));
      }
    } catch (err) {
      alert("errorr ");
    }
  };

  useEffect(() => {
    getLocation();
    dispatch(fetchOfferApi());
    dispatch(fetchShopCategoriesApi());
  }, []);
  

  const handleFilterChange = (selectedValue) => {
    setfilter(false);
    if (selectedValue === "All") return setFilterAdvert(advert);
    setFilterAdvert(advert.filter((item) => item?.category === selectedValue));
  };

  if (loading) return <Spinner visible={loading} textContent="Loading..." />;

  const processData = (data) => (data ? data + "," : "");

  // const locationText = `Location - ${processData(
  //   location?.street
  // )} ${processData(location?.city)}${processData(location.state)} ${processData(
  //   location.postalCode
  // )} ${processData(location?.country)}`;

  return (
    <ScrollView style={styles.root}>
      {user?.liveAddress?.city ? (
        <CustomText
          style={{ textAlign: "center", paddingTop: 18 }}
          value={"City - " + user.liveAddress.city}
        />
      ) : (
        <LocationAlert onPress={getLocation} />
      )}

      {/* SHOP BY CATEGORY */}
      <ShopByCategory handleFilterChange={handleFilterChange} />
      {/* <RowCategory handleFilterChange={handleFilterChange} /> */}

      {/* TOP DEALS */}
      <TopDeals navigation={navigation} />

      {/* ALL SHOPS */}
      {/* <ALlShops deals={filterAdvert} /> */}

      {/* Top Hotels */}
      {/* <View style={{ margin: 15 }}>
        <Header title="Advertise Panel" />

        <ScrollView
          horizontal={true}
          style={{ marginVertical: 20 }}
          showsHorizontalScrollIndicator={false}
        >
          {filterHotel?.length === 0 && <NoData text="Advertise Panel" />}
          <View style={{ flexDirection: "row" }}>
            {filterHotel?.map((res, index) => (
              <TopHotels
                onPress={() => navigation.navigate("offer", res)}
                uri={res.bannerImage}
                key={index}
              />
            ))}
          </View>
        </ScrollView>
      </View> */}
      <CategoryModel
        isFilter={isFilter}
        handleFilterChange={handleFilterChange}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginLeft: 20,
    marginBottom: 20,
  },
  location: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  root: {
    backgroundColor: Colors.primary.main,
    paddingBottom: 50,
  },
});

export default Home;
