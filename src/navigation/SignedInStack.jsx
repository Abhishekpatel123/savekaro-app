import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import Drawer from "./Drawer";
import { Offer } from "../screens";

import { Colors, Fonts } from "../styles";
import { CustomText } from "../components/atoms";

const SignedInStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={"home"}>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "",
        }}
        component={Drawer}
      />
      <Stack.Screen
        component={Offer}
        name="offer"
        options={{
          header: ({ navigation }) => (
            <SafeAreaView
              style={{
                backgroundColor: Colors.primary.main,
                borderBottomWidth: 0.4,
                paddingVertical: 10,
                borderColor: "rgba(255, 255, 255,0.1)",
                paddingLeft: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={navigation.goBack}
                style={{ marginRight: 10 }}
              >
                <Ionicons
                  name="arrow-back-circle"
                  size={30}
                  color={Colors.primary.light}
                />
              </TouchableOpacity>
              <CustomText
                type="title"
                font={Fonts.OpenSans.Bold}
                style={{ alignSelf: "center" }}
                value="Offer Detail"
              />
            </SafeAreaView>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default SignedInStack;
