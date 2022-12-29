import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens";
import { Colors, Fonts } from "../styles";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { CustomText } from "../components/atoms";

const Tab = createBottomTabNavigator();

const IconsArrayFun = (index, isFocused) => {
  const array = [
    <AntDesign
      name="home"
      size={24}
      color={isFocused ? Colors.white : "grey"}
    />,
    <MaterialIcons
      name="payment"
      size={24}
      color={isFocused ? Colors.white : "grey"}
    />,
    <MaterialCommunityIcons
      name="ticket-percent-outline"
      size={24}
      color={isFocused ? Colors.white : "grey"}
    />,
    <Ionicons
      name="menu-outline"
      size={24}
      color={isFocused ? Colors.white : "grey"}
    />,
  ];
  return array[index];
};

const MyTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "rgba(41, 45, 50,0.96)",
        // backgroundColor: "rgba(52, 52, 52, 0.8)",
        // backgroundColor: 'transparent',
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        // opacity: 0.4,
        borderTopWidth: 1,
        borderColor: "#333",
        paddingVertical: 5,
        minHeight: 75,
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            {IconsArrayFun(index, isFocused)}
            <CustomText
              color={isFocused ? Colors.white : "grey"}
              value={label}
              font={Fonts.RobotoMono.Regular}
              style={{ marginTop: 3, fontSize: 12 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: "Take your money back",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => {
            return;
          },
        }}
      />
      <Tab.Screen name="Payments" component={Home} />
      <Tab.Screen name="Cashback" component={Home} />
      <Tab.Screen
        name="Menu"
        component={Home}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            navigation.openDrawer();
            e.preventDefault();
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
