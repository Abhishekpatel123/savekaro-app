import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../components/organisms";
import ChangePassword from "../../Screens/ChangePassword/ChangePassword";
import Profile from "../../Screens/Profile/Profile";
import ReferAFriend from "../../Screens/ReferAFriend/ReferAFriend";
import Support from "../../Screens/Support/Support";
import BottomTab from "./BottomTab";
import Help from "../../Screens/Help/Help";
import { Offer } from "../screens";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const state = useSelector((state) => state.user);
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        component={Profile}
        name="profile"
        options={{ headerShadowVisible: false, headerTitle: "Profile" }}
      />
      <Drawer.Screen
        component={ChangePassword}
        name="ChangePassword"
        options={{ headerShadowVisible: false, headerTitle: "" }}
      />
      {/* <Drawer.Screen
        component={Help}
        name="help"
        options={{ headerShadowVisible: false, headerTitle: "" }}
      /> */}
      <Drawer.Screen
        component={Support}
        name="support"
        options={{ headerShadowVisible: false, headerTitle: "Tech Support" }}
      />
      <Drawer.Screen
        component={ReferAFriend}
        name="refer"
        options={{ headerShadowVisible: false, headerTitle: "Refer A Friend" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
