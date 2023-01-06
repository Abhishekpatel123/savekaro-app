import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

// -
import { getDate } from "../../services/getDate";
import { urlFor } from "../api/sanity";
import { Colors, Fonts } from "../styles";
import { Button, CustomText } from "../components/atoms";
import { useSelector } from "react-redux";
import { bookOfferApi } from "../store/features/offerSlice";

const Offer = () => {
  const [show, setShow] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const alert = useSelector((state) => state.offer.alert);
  
  const {
    _id,
    title,
    description,
    discount,
    bannerImageUrl,
    shopCategory,
    shopkeeper,
    expiryDate,
  } = params;

  const { name, email, phone, shopAddress, shopName } = shopkeeper;
  // const [copiedText, setCopiedText] = React.useState(params.couponCode);

  const copyToClipboard = () => {
    Clipboard.setString(params.coupon);
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  // };

  useEffect(() => {
    // if (navigation.getState()) {
    //   setShow(false);
    // }
  }, []);

  const isCouponExpired = (date) => {
    // new
    let getDate = new Date(date);
    let expiryDate = getDate.getTime();

    // old
    // const [m, d, y] = date.split("-");
    // let dateFormat = y + "-" + m + "-" + d;
    // console.log(dateFormat);
    // let expiryDate = new Date(dateFormat);
    // expiryDate = expiryDate.getTime();
    return expiryDate > Date.now();
  };

  const handleBook = () => {
    dispatch(bookOfferApi({ offerId: _id }));
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={{ paddingHorizontal: 15 }}>
        {/* OFFER BANNER */}
        <ImageBackground
          // source={{ uri: urlFor(bannerImage).url() }}
          source={{ uri: bannerImageUrl }}
          style={styles.offerBanner}
          resizeMode="cover"
        />

        {/* DETAIL OF OFFER  */}
        <View style={{ marginTop: 35 }}>
          <CustomText
            style={[styles.hurry, styles.shadow]}
            value="HURRY!"
            font={Fonts.OpenSans.Bold}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <CustomText value="Shop Name - " />
            <CustomText value={shopName} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText value="City - " />
            <CustomText value={shopAddress?.city} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText value="Discount - " />
            <CustomText value={discount + "%"} />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText value="Shop Category - " />
            <CustomText value={shopCategory} />
          </View>
          {alert && (
            <CustomText
              style={{ marginVertical: 10 }}
              type="title"
              value={alert?.message}
            />
          )}
          <CustomText
            style={{ marginVertical: 10 }}
            type="title"
            value={title}
          />
          <CustomText value={description} />
        </View>

        {/* EXTRA INFO  */}
        <View style={{ paddingVertical: 20 }}>
          <View style={styles.validContainer}>
            <CustomText style={styles.validText} value="Valid Till" />
            <CustomText
              style={[styles.validText]}
              value={
                isCouponExpired(expiryDate)
                  ? getDate(expiryDate)
                  : "Coupon expired"
              }
            />
          </View>
        </View>

        {/* GET YOUR COUPON CODE HERE  */}
        {/* {show ? (
          <View style={[styles.showCoupon, styles.shadow]}>
            <CustomText style={styles.showCouponText} value={couponCode} />
            <TouchableOpacity onPress={copyToClipboard}>
              <Feather name="clipboard" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.showCoupon, styles.shadow]}
            onPress={() => setShow(true)}
          >
            <CustomText
              style={styles.showCouponText}
              value="SHOW COUPON CODE"
            />
          </TouchableOpacity>
        )} */}
      </View>

      <Button
        value={
          accessToken
            ? "Book your appointment"
            : "First login and book your appointment"
        }
        color={Colors.secondary.main}
        onPress={handleBook}
      />

      {/* SOCIAL ICONS  */}
      <View style={styles.socialMediaIconsContainer}>
        {[
          {
            phoneLink: `tel://${phone}`,
            icon: "https://i.pinimg.com/originals/73/59/a8/7359a8e49a6fadcc653bd947f91df724.jpg",
            name: "call",
            color: "#0FA519",
          },
        ].map(({ phoneLink, icon, name, color }, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => Linking.openURL(phoneLink)}
            style={[
              styles.shadow,
              { backgroundColor: "white", borderRadius: 100, padding: 8 },
            ]}
          >
            <Ionicons name={name} size={28} color={color} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Offer;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.primary.main,
  },
  innerContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#a8b3cf99",
    justifyContent: "center",
    alignItems: "center",
  },
  offerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 5,
  },
  hurry: {
    backgroundColor: "red",
    padding: 5,
    color: "white",
    // fontWeight: "bold",
    maxWidth: 90,
    textAlign: "center",
    marginBottom: 5,
    fontSize: 12,
  },
  shadow: {
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  showCoupon: {
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#FFE162",
    // backgroundColor: Colors.primary.light,

    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  showCouponText: { fontSize: 18, color: "black", fontWeight: "bold" },
  socialMediaIconsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "#33311144",
    backgroundColor: Colors.primary.light,
    paddingVertical: 10,
    marginTop: 15,
  },
  offerBanner: {
    alignItems: "center",
    // backgroundColor: "lightgreen",
    backgroundColor: Colors.primary.main,
    paddingVertical: 10,
    height: 140,
    resizeMode: "cover",
  },
  validContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  validText: {
    fontSize: 18,
    marginBottom: 1,
    color: Colors.primary.light,
    marginRight: 10,
    textDecorationLine: "underline",
  },
});
