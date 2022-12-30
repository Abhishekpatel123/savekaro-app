import React, { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import Login from "./Screens/Login/Login";
import Store from "./Store/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Drawer } from "./src/navigation";
import Register from "./Screens/Register/Register";
import NetInfo from "@react-native-community/netinfo";
import NoInternet from "./Screens/NoInternet/NoInternet";
import ForgotPassword from "./Screens/ForgotPassword/ForgotPassword";
import axios from "axios";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [internet, setInternet] = useState(null);

  // FONT
  const [fontsLoaded] = useFonts({
    // RobotoMono
    "RobotoMono-Bold": require("./src/assets/fonts/RobotoMono-Bold.ttf"),
    "RobotoMono-Bold-Italic": require("./src/assets/fonts/RobotoMono-BoldItalic.ttf"),
    "RobotoMono-ExtraLight": require("./src/assets/fonts/RobotoMono-ExtraLight.ttf"),
    "RobotoMono-ExtraLight-Italic": require("./src/assets/fonts/RobotoMono-ExtraLightItalic.ttf"),
    "RobotoMono-Italic": require("./src/assets/fonts/RobotoMono-Italic.ttf"),
    "RobotoMono-Light": require("./src/assets/fonts/RobotoMono-Light.ttf"),
    "RobotoMono-Light-Italic": require("./src/assets/fonts/RobotoMono-LightItalic.ttf"),
    "RobotoMono-Medium": require("./src/assets/fonts/RobotoMono-Medium.ttf"),
    "RobotoMono-Medium-Italic": require("./src/assets/fonts/RobotoMono-MediumItalic.ttf"),
    "RobotoMono-Regular": require("./src/assets/fonts/RobotoMono-Regular.ttf"),
    "RobotoMono-SemiBold": require("./src/assets/fonts/RobotoMono-SemiBold.ttf"),
    "RobotoMono-SemiBold-Italic": require("./src/assets/fonts/RobotoMono-SemiBoldItalic.ttf"),
    "RobotoMono-Thin": require("./src/assets/fonts/RobotoMono-Thin.ttf"),
    "RobotoMono-Thin-Italic": require("./src/assets/fonts/RobotoMono-ThinItalic.ttf"),
    // OpenSans
    "OpenSans-Bold": require("./src/assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Bold-Italic": require("./src/assets/fonts/OpenSans-BoldItalic.ttf"),
    "OpenSans-ExtraBold": require("./src/assets/fonts/OpenSans-ExtraBold.ttf"),
    "OpenSans-ExtraBold-Italic": require("./src/assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
    "OpenSans-Italic": require("./src/assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-Light": require("./src/assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-Light-Italic": require("./src/assets/fonts/OpenSans-LightItalic.ttf"),
    "OpenSans-Medium": require("./src/assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-Medium-Italic": require("./src/assets/fonts/OpenSans-MediumItalic.ttf"),
    "OpenSans-Regular": require("./src/assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-SemiBold-Italic": require("./src/assets/fonts/OpenSans-SemiBoldItalic.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) await SplashScreen.hideAsync();
  // }, [fontsLoaded]);

  const fetchInternet = async () => {
    await NetInfo.fetch().then((state) => {
      setInternet(state.isConnected);
    });
  };

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    fetchInternet();
  }, []);

  if (!fontsLoaded) return <Text>font not loaded yet</Text>;
  else SplashScreen.hideAsync();

  return (
    <>
      {internet ? (
        <NavigationContainer>
          <Provider store={Store}>
            <Stack.Navigator initialRouteName="login">
              <Stack.Screen
                name="login"
                options={{
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={Login}
              />
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
                name="register"
                options={{
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={Register}
              />
              <Stack.Screen
                name="forgotpassword"
                options={{
                  headerShadowVisible: false,
                  headerTitle: "",
                }}
                component={ForgotPassword}
              />
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      ) : (
        <NoInternet />
      )}
    </>
  );
};

export default App;
