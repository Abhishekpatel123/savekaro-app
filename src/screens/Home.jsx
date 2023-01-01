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
import config from "../../config/config";
import NoData from "../../helpers/NoData";
import { getDistance, getPreciseDistance } from "geolib";
import RowCategory, {
  CategoryModel,
} from "../../Screens/Home/helpers/Category";
import { SearchInput, CustomText } from "../components/atoms";
import { Header, LocationAlert, OfferCard } from "../components/molecules";
import { Colors } from "../styles";
import { ALlShops, ShopByCategory, TopDeals } from "../components/organisms";

const Home = ({ navigation }) => {
  const [hotel, setHotel] = useState([]);
  const [advert, setAdvert] = useState([]);
  const [filterAdvert, setFilterAdvert] = useState([]);
  const [filterHotel, setFilterHotel] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isFilter, setfilter] = useState(false);
  const [liveCords, setLiveCords] = useState(null);
  const location = useSelector((state) => state.location);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  console.log(token, "token");

  const getLocation = async () => {
    // setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({ accuracy: 0.1 });
      if (location) {
        const { latitude, longitude } = location.coords;
        console.log(latitude, longitude);
        setLiveCords({ latitude, longitude });
        const response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        const res = await axios.get(
          config.advert_suggestion_url + `/${latitude}/${longitude}`,
          options
        );
        console.log(res.data, "res");
        setFilterHotel(res.data.shortedAdverts);

        dispatch({
          type: "SET_LOCATION",
          location: response[0],
        });
        // await axios
        //   .get(
        //     config.locationApi_url +
        //       `${location.coords.latitude},${location.coords.longitude}`
        //   )
        //   .then((res) => {
        //     console.log("location ", res.data.data);
        //     dispatch({
        //       type: "SET_LOCATION",
        //       location: res.data.data[0],
        //     });
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   })
        //   .finally(() => setLoading(false));
      }
    } catch (err) {
      alert("errorr ");
    }

    // setLoading(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleFilterChange = (selectedValue) => {
    setfilter(false);
    if (selectedValue === "All") return setFilterAdvert(advert);
    setFilterAdvert(advert.filter((item) => item?.category === selectedValue));
  };

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get(config.advert_url, options).then((res) => {
      setAdvert(res.data);
      setFilterAdvert(res.data);
    });
  }, []);

  if (loading) return <Spinner visible={loading} textContent="Loading..." />;

  const processData = (data) => (data ? data + "," : "");

  const locationText = `Location - ${processData(
    location?.street
  )} ${processData(location?.city)}${processData(location.state)} ${processData(
    location.postalCode
  )} ${processData(location?.country)}`;

  return (
    <ScrollView style={styles.root}>
      {location.region ? (
        <CustomText
          style={{ textAlign: "center", paddingTop: 18 }}
          value={locationText}
        />
      ) : (
        <LocationAlert onPress={getLocation} />
      )}

      {/* SHOP BY CATEGORY */}
      <ShopByCategory deals={filterAdvert} />
      {/* <RowCategory handleFilterChange={handleFilterChange} /> */}

      {/* TOP DEALS */}
      <TopDeals deals={filterAdvert} navigation={navigation} />

      {/* ALL SHOPS */}
      <ALlShops deals={filterAdvert} />

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
                onPress={() => navigation.navigate("advertinfo", res)}
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
