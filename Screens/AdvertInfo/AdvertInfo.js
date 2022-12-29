import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ImageBackground,
  Button,
} from "react-native";
import Container from "../../helpers/Container";
import { socialLinks } from "./data";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Feather } from "@expo/vector-icons";
import { getDate } from "../../services/getDate";

const AdvertInfo = () => {
  const [show, setShow] = useState(false);
  const { params } = useRoute();
  const navigation = useNavigation();

  // const [copiedText, setCopiedText] = React.useState(params.couponCode);

  const copyToClipboard = () => {
    Clipboard.setString(params.couponCode);
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
    console.log(expiryDate);

    // old
    // const [m, d, y] = date.split("-");
    // let dateFormat = y + "-" + m + "-" + d;
    // console.log(dateFormat);
    // let expiryDate = new Date(dateFormat);
    // expiryDate = expiryDate.getTime();
    if (expiryDate > Date.now()) return true;
    else return false;
  };

  console.log(params, "parems");
  return (
    <View style={styles.root}>
      <View style={{ paddingHorizontal: 15 }}>
        {/* OFFER BANNER */}
        <ImageBackground
          source={
            params?.bannerImage
              ? { uri: params?.bannerImage }
              : require("./offerbanner.jpg")
          }
          style={styles.offerBanner}
        ></ImageBackground>

        {/* DETAIL OF OFFER  */}
        <View style={{ marginTop: 35 }}>
          <Text style={[styles.hurry, styles.shadow]}>HURRY!</Text>

          <Text
            style={{ fontSize: 25, fontWeight: "bold", fontStyle: "italic" }}
          >
            Flat
            <Text style={{ fontSize: 25, fontWeight: "700", color: "green" }}>
              {" " + params?.discount + "%"}
            </Text>
            Off on {params.description} Via ICIC Bank Credit Cards
          </Text>
        </View>

        {/* EXTRA INFO  */}
        <View style={{ paddingVertical: 20 }}>
          <Text style={{ fontSize: 14, marginBottom: 1 }}>
            Get.. {params.discount} on {params.description}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 1 }}>
            Maximum discount.. {params.discount}
          </Text>
          <View style={styles.validContainer}>
            <Text style={styles.validText}>Valid Till </Text>
            <Text
              style={[
                styles.validText,
                {
                  marginLeft: 10,
                  textDecorationLine: "underline",
                },
              ]}
            >
              {isCouponExpired(params.endDate)
                ? getDate(params.endDate)
                : "Coupon expired"}
            </Text>
          </View>
        </View>

        {/* GET YOUR COUPON CODE HERE  */}
        {show ? (
          <View style={[styles.showCoupon, styles.shadow]}>
            <Text
              style={[
                styles.showCouponText,
                { color: "gray", letterSpacing: 0.8 },
              ]}
            >
              {params.couponCode}
            </Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Feather name="clipboard" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.showCoupon, styles.shadow]}
            onPress={() => setShow(true)}
          >
            <Text style={styles.showCouponText}>SHOW COUPON CODE</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* SOCIAL ICONS  */}
      <View style={styles.socialMediaIconsContainer}>
        {socialLinks({
          googleMapsURL: params.googleMapsURL,
          facebookURL: params.facebookURL,
          phone: `tel://${params.phone}`,
        }).map((socialLink, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => Linking.openURL(socialLink.link)}
            style={[
              styles.shadow,
              { backgroundColor: "white", borderRadius: 100, padding: 8 },
            ]}
          >
            <Ionicons
              name={socialLink?.name}
              size={28}
              color={socialLink?.color}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AdvertInfo;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
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
    fontWeight: "bold",
    maxWidth: 80,
    textAlign: "center",
    marginBottom: 5,
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
    backgroundColor: "#33311144",
    paddingVertical: 10,
  },
  offerBanner: {
    alignItems: "center",
    backgroundColor: "lightgreen",
    paddingVertical: 10,
    height: 140,
    resizeMode: "cover",
  },
  validContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  validText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
  },
});
