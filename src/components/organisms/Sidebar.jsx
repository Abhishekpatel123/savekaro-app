import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import logout from "../../../icons/logout.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Fonts } from "../../styles";
import { CustomText, Logo } from "../atoms";
import { drawerData } from "../../assets/database";
import { DrawerContentScrollView } from "@react-navigation/drawer";

const Sidebar = (props) => {
  const { navigation } = props;
  const signout = () => {
    Alert.alert("Logout", "Want to logout ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("token").then(() => {
            navigation.replace("login");
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary.main }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Logo />
          {drawerData.topLinks.map(({ icon, text, route }, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate(route);
                navigation.closeDrawer();
              }}
            >
              <View style={styles.customItem}>
                {icon}
                <CustomText
                  value={text}
                  color={Colors.primary.light}
                  font={Fonts.OpenSans.Medium}
                  style={{ marginLeft: 10, fontSize: 15 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            borderTopWidth: 1,
            paddingTop: 20,
            borderTopColor: "#333",
          }}
        >
          {drawerData.bottomLinks.map(({ text, icon }, idx) => (
            <TouchableOpacity key={idx} onPress={signout}>
              <View style={styles.customItem}>
                {icon}
                <CustomText
                  value={text}
                  color={Colors.primary.light}
                  font={Fonts.OpenSans.Medium}
                  style={{ marginLeft: 10, fontSize: 15 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 240,
    height: 150,
    borderRadius: 100 / 2,
    alignSelf: "center",
    marginLeft: -30,
  },
  iconStyle: {
    width: 30,
    height: 30,
    margin: 4,
  },
  customItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 25,
  },
});

export default Sidebar;
